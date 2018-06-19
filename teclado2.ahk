#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.
#SingleInstance, force


send, ^c

f::
SendInput {alt down}
; Sleep 50
SendInput {Numpad1}
; Sleep 50
SendInput {Numpad0}
; Sleep 50
SendInput {Numpad2}
; Sleep 50
SendInput {alt up}
; ExitApp

