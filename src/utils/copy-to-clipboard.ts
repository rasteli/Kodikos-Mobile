import * as Clipboard from "expo-clipboard"

export function copyToClipboard(text?: string) {
  if (text) Clipboard.setString(text)
}
