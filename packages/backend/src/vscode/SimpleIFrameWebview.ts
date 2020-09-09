/*
 * Copyright 2020 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as vscode from "vscode";
import { ViewColumn } from "vscode";

export class SimpleURLWebView {
  private webviewPanel: vscode.WebviewPanel;
  constructor(private readonly context: vscode.ExtensionContext) {}

  public reload() {
    const currentHtml = this.webviewPanel.webview.html;
    this.webviewPanel.webview.html = "";
    this.webviewPanel.webview.html = currentHtml;
  }

  public open(pageId: string, pageTitle: string, url: string) {
    this.webviewPanel = vscode.window.createWebviewPanel(pageId, pageTitle, ViewColumn.Beside, {
      retainContextWhenHidden: true,
      enableCommandUris: true,
      enableScripts: true,
      localResourceRoots: [vscode.Uri.file(this.context.extensionPath)]
    });

    this.enableOpenFormButton(true);

    this.webviewPanel.webview.html = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <style>
        html, body {
            margin: 0;
            border: 0;
            padding: 0px;
            width: 100%;
            height: 100%;
        }
      </style>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body>
      <iframe src="${url}" width="100%" height="100%" frameborder="0"></iframe>
    </body>
    </html>`;

    this.webviewPanel.onDidDispose(
      () => {
        this.enableOpenFormButton(false);
      },
      this.webviewPanel.webview,
      this.context.subscriptions
    );
  }

  private enableOpenFormButton(isEnabled: boolean) {
    vscode.commands.executeCommand("setContext", "kogito.urlPageOpen", isEnabled);
  }
}
