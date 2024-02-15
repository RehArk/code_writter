# code_writter

Code Writer is a small TypeScript student project aimed at dynamically animating code on a web page.

You could use it like this :

```ts
$codeWritter = new CodeWritter();
$codeWritter
    .setCode("echo \"Hello World\"")
    .setUpdates([new Update(0, new ActionReplace("echo \"Hello World !\""))])
    .run()
;
```

Available action are :
- ActionAdd with string param code like "echo \"Hello World\""
- ActionRemove
- ActionReplace with string param code like "echo \"Hello World\""
- ActionSwitch with number param of line to switch with like 1
