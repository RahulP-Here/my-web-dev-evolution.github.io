# Clutter Cleaner

## Overview

Clutter Cleaner is a Node.js project that organizes files in a specified folder according to their extensions. It automatically moves files into corresponding folders based on their file types, making it easier to manage and locate files.

## Features

- Automatically creates folders for different file extensions.
- Moves files into their respective folders based on their extensions.
- Ignores specific file types (e.g., `.ini` files).

## Project Structure

- **JavaScript File:** [`cleaner.js`](./Clutter%20Cleaner/cleaner.js)

- **JSON File:** [`package.json`](./Clutter%20Cleaner/package.json)

- **.bat File:** [`run.bat`](./Clutter%20Cleaner/run.bat)

- **Description:** Clutter Cleaner automates file organization in a specified folder based on file extensions, simplifying file management and retrieval.

- **Used Tech.:** JavaScript, NPM, NodeJS

## Prerequisites

- Node.js installed on your system.
- Basic knowledge of using the command line.

## Project Structure
```
Clutter Cleaner
├── clean.js
├── package.json
└── run.bat
```


## Getting Started

### Initializing the Node.js Project

1. **Clone the repository**:
   ```bash
   git clone https://github.com/RahulP-Here/my-web-dev-evolution.git
   cd ./Project-12/Clutter Cleaner
   ```
   
`or`

2. **Initialize the Node.js project**:
   ```bash
   npm init -y
   ```

3. **Required Packages**:
- Since this project uses native Node.js modules (`fs` and `path`), no additional packages are required.

### Folder Structure
Ensure the `Clutter Cleaner` folder contains the following files:

- `clean.js`: The main script to organize files.
- `package.json`: Contains metadata about the project.
- `run.bat`: Batch file to run the script easily on Windows.

## Steps

1. **Move the `Clutter Cleaner` folder to the directory containing clutter**:
   - Ensure that the folder contains the files you want to organize.
   
      ![Add Clutter Cleaner](./static/snap%20shots/add%20clutter%20cleaner.png)

2. **Run the batch file**:
   - Double-click on `run.bat` to execute the script. This will open a terminal window showing the results of the operation.

      ![Run File](./static/snap%20shots/clutter%20clener%20folder.png)

3. **View the results**:
   - The script will create folders based on file extensions and move the files into their respective folders. If any errors occur, they will be displayed in the terminal.

      ![Result](./static/snap%20shots/terminal.png)


## Example

- #### Before running the script, the directory structure might look like this:
```
Directory:
├── file1.txt
├── file2.js
├── file3.json
└── file5.pdf
```

   ![Before](./static/snap%20shots/before%20clean.png)

- #### After running the script, the directory structure might look like this:
```
Directory:
├── js
│   └── file2.js
├── json
│   └── file3.json
├── pdf
│   └── file5.pdf
├── txt
│   └── file1.txt
└── Clutter Cleaner
│   └── clean.js
│   └── package.json
│   └── run.bat

```

   ![After](./static/snap%20shots/after%20clean.png)


## Contributing

Feel free to submit issues or pull requests if you have any improvements or suggestions.

## License

This project is licensed under the ISC License.

