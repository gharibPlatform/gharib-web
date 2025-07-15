const path = require("path");
const { Project } = require("ts-morph");

const project = new Project({
  tsConfigFilePath: "tsconfig.json",
});

const files = project.getSourceFiles("src/**/*.jsx");

files.forEach((file) => {
  file.getImportDeclarations().forEach((decl) => {
    const spec = decl.getModuleSpecifierValue();
    if (spec.startsWith("@/")) {
      const absImportPath = path.resolve("src", spec.slice(2));
      const relativePath = path.relative(
        path.dirname(file.getFilePath()),
        absImportPath,
      );
      decl.setModuleSpecifier(
        relativePath.startsWith(".") ? relativePath : "./" + relativePath,
      );
    }
  });
});

project.save().then(() => {
  console.log("🧙 All @ imports have been rewritten.");
});
