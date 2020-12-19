import fs from 'fs';
import path from 'path';

export function writeFile(name: string, content: string) {
  const outputPath = getOutputPath(name);

  fs.writeFileSync(outputPath, content);
}

function getOutputPath(name: string) {
  const outputDirPath = path.resolve(__dirname, '../output');
  return path.resolve(outputDirPath, name);
}
