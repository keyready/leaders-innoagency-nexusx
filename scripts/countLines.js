const fs = require('fs');
const path = require('path');

function countLinesInFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    return lines.length;
}

function countLinesInDirectory(dirPath) {
    let totalCount = 0;

    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isFile()) {
            totalCount += countLinesInFile(filePath);
        } else if (stat.isDirectory()) {
            totalCount += countLinesInDirectory(filePath);
        }
    });

    return totalCount;
}

const directoryPath = path.resolve(__dirname, '../src'); // Замените на путь к вашей директории

const totalLines = countLinesInDirectory(directoryPath);
console.log(`Общее количество строк: ${totalLines}`);
