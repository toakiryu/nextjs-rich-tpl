#!/usr/bin/env node

import { exec, spawn } from "child_process";
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import os from "os";
import { rimraf } from "rimraf";
import cliProgress from "cli-progress";
import chalk from "chalk";
import ora from "ora";

const templates = [
  {
    name: "app/with-i18n-routing",
    description: "Next.js app with i18n routing setup",
    path: "templates/app/with-i18n-routing",
  },
  {
    name: "app/without-i18n-routing",
    description: "Next.js app without i18n routing setup",
    path: "templates/app/without-i18n-routing",
  },
];

let isCancelled = false;

// プロセス中断時のクリーンアップ
process.on("SIGINT", () => {
  isCancelled = true;
  console.log(chalk.red("\nProcess interrupted. Cleaning up..."));
  cleanup();
  process.exit(1);
});

function cleanup(tmpDir) {
  if (tmpDir && fs.existsSync(tmpDir)) {
    console.log(chalk.blue("\nCleaning up temporary directory..."));
    rimraf.sync(tmpDir);
    console.log(chalk.gray("\nTemporary directory removed."));
  }
}

// コマンドライン引数を解析
const args = process.argv.slice(2);
let templateName = null;
let projectName = null;

if (args.includes("-c") || args.includes("--create")) {
  const index = args.findIndex((arg) => arg === "-c" || arg === "--create");
  templateName = args[index + 1];
  projectName = args[index + 2];
}

function countFiles(dir) {
  let fileCount = 0;
  const entries = fs.readdirSync(dir);

  entries.forEach((entry) => {
    const entryPath = path.join(dir, entry);
    if (fs.lstatSync(entryPath).isDirectory()) {
      fileCount += countFiles(entryPath);
    } else {
      fileCount++;
    }
  });

  return fileCount;
}

function copyDirectory(src, dest, progressBar) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src);

  entries.forEach((entry) => {
    const srcPath = path.join(src, entry);
    const destPath = path.join(dest, entry);

    if (fs.lstatSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath, progressBar);
    } else {
      fs.copyFileSync(srcPath, destPath);
      progressBar.increment();
    }
  });
}

function showProgressBar(total, message) {
  const bar = new cliProgress.SingleBar(
    {
      format: `${message} |{bar}| {percentage}% || {value}/{total} Chunks || Speed: {speed}`,
      barCompleteChar: "\u2588",
      barIncompleteChar: "\u2591",
      hideCursor: true,
    },
    cliProgress.Presets.shades_classic
  );

  bar.start(total, 0, { speed: "N/A" });
  return bar;
}

function runCommand(command) {
  return new Promise((resolve, reject) => {
    const proc = exec(command, (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });

    proc.stdout.on("data", (data) => {
      process.stdout.write(data);
    });

    proc.stderr.on("data", (data) => {
      process.stderr.write(data);
    });
  });
}

async function installDependencies() {
  const spinner = ora(chalk.blue("Installing dependencies...")).start();

  return new Promise((resolve, reject) => {
    const installProcess = spawn("npm", ["install"], { stdio: "pipe" });

    installProcess.stdout.on("data", (data) => {
      spinner.text = chalk.blue(
        `Installing dependencies...\n${chalk.gray(data.toString())}`
      );
    });

    installProcess.stderr.on("data", (data) => {
      spinner.text = chalk.red(`Error during install: ${data.toString()}`);
    });

    installProcess.on("close", (code) => {
      spinner.stop();
      if (code === 0) {
        console.log(chalk.green("\nDependencies installed successfully.\n"));
        resolve();
      } else {
        reject(new Error(`npm install process exited with code ${code}`));
      }
    });
  });
}

async function setupProject(selectedTemplate, targetPath) {
  const tmpDir = path.join(os.tmpdir(), `nextjs-rich-tpl-${Date.now()}`);

  try {
    // 一時ディレクトリ作成
    try {
      fs.mkdirSync(tmpDir, { recursive: true });
    } catch (error) {
      console.error(chalk.red("Failed to create temporary directory:", error));
      process.exit(1);
    }

    console.log(chalk.blue(`Using temporary directory: ${tmpDir}`));

    // リポジトリを一時ディレクトリにクローン
    console.log(chalk.blue("Cloning repository to temporary directory..."));
    await runCommand(
      `git clone https://github.com/Fun117/nextjs-rich-tpl.git ${tmpDir}`
    );

    // テンプレートのパスを構築
    const templatePath = path.join(tmpDir, selectedTemplate.path);

    // テンプレートが存在するか確認
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template path does not exist: ${templatePath}`);
    }

    // 必要なファイルを実行ディレクトリにコピー
    console.log(chalk.blue("Copying template files to project directory..."));
    const totalFilesToCopy = countFiles(templatePath);
    const progressBar = showProgressBar(totalFilesToCopy, "Copying files");
    try {
      copyDirectory(templatePath, targetPath, progressBar);
    } catch (error) {
      console.error(chalk.red(`Error during copyDirectory: ${error.message}`));
      console.error(chalk.gray(error.stack));
      throw error;
    }
    progressBar.stop();

    console.log(chalk.gray("Template files copied."));

    // 依存関係をインストール
    await installDependencies();

    console.log(
      chalk.green(`\nSuccess! Created ${projectName} at ${targetPath}\n`)
    );
  } catch (error) {
    console.error(chalk.red("\nAn error occurred:", error));
  } finally {
    cleanup(tmpDir);
  }
}

(async () => {
  if (!templateName || !projectName) {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "templateName",
        message: "Select a Next.js template:",
        choices: templates.map((t) => ({ name: t.description, value: t.name })),
      },
      {
        type: "input",
        name: "projectName",
        message: "Enter your project name:",
        default: "my-nextjs-app",
      },
    ]);
    templateName = answers.templateName;
    projectName = answers.projectName;
  }

  const selectedTemplate = templates.find((t) => t.name === templateName);
  if (!selectedTemplate) {
    console.error(chalk.red(`Error: Template '${templateName}' not found.`));
    process.exit(1);
  }

  const targetPath = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(targetPath)) {
    console.error(chalk.red(`Error: Directory ${projectName} already exists.`));
    process.exit(1);
  }

  console.log(
    chalk.blue(
      `\nCreating a new Next.js Rich Template in ${chalk.green(targetPath)}\n`
    )
  );

  await setupProject(selectedTemplate, targetPath);
})();
