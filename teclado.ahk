#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.
#SingleInstance, force

~f::
IfWinActive, Path of Exile
{
	send, ^c
}	
return



; fullScriptPath = C:\Users\VICTOR\Desktop\atalhoSom.ahk

; DetectHiddenWindows, On 
; WinClose, %fullScriptPath% ahk_class AutoHotkey



; ExitApp