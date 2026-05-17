Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
toolDir = fso.GetParentFolderName(WScript.ScriptFullName)
shell.CurrentDirectory = toolDir
shell.Run "node src\notifier.mjs", 0, False
