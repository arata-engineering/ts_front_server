import * as fs from "fs";
import * as path from "path";

const filePath: string = path.join(__dirname, "../../../WEB-INF/csv/test.csv");
const backUpFilePath: string = path.join(__dirname, "../../../WEB-INF/csv/test.txt");

/*
fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
        return console.log(err);
    }
    fs.writeFile(backUpFilePath, data, err => {
        if (err) {
            return console.log(err);
        }
    });
});
*/

function readFileAsync(filePath: string): Promise<string> {
    return new Promise<string>((resolve, rejects) => {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) {
                rejects(err);
                return;
            }
            resolve(data);
        });
    });
}
function writeFileAsync(filePath: string, data: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        fs.writeFile(filePath, data, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}
readFileAsync(filePath)
    .then(data => writeFileAsync(backUpFilePath, data))
    .catch(err => console.log(err));