import os

def scan_files(directory, extensions=None):
    """
    Walks through the directory (and its subdirectories) to read files.

    Parameters:
        directory (str): The root directory to scan.
        extensions (list, optional): A list of file extensions to filter by (e.g., ['.py', '.txt']).
                                     If None or empty, all files will be included.

    Returns:
        dict: A dictionary where keys are file paths and values are the file contents.
    """
    file_contents = {}
    for root, dirs, files in os.walk(directory):
        for file in files:
            # If extensions is given, only process files that end with one of them.
            if extensions and not any(file.endswith(ext) for ext in extensions):
                continue
            file_path = os.path.join(root, file)
            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                file_contents[file_path] = content
            except Exception as e:
                print(f"Could not read {file_path}: {e}")
    return file_contents

def write_combined_file(file_contents, output_file):
    """
    Writes the collected file contents to one output file.

    Parameters:
        file_contents (dict): Dictionary of file paths and their contents.
        output_file (str): Path to the file where combined contents will be written.
    """
    with open(output_file, 'w', encoding='utf-8') as f:
        for file_path, content in file_contents.items():
            f.write(f"\n{'='*80}\n")
            f.write(f"File: {file_path}\n")
            f.write(f"{'='*80}\n")
            f.write(content)
            f.write("\n\n")
    print(f"Combined file created at: {output_file}")

if __name__ == "__main__":
    directory = input("Enter the directory to scan: ").strip()

    extensions_input = input("Enter file extensions to filter by (comma separated, e.g., .py,.txt), or leave blank for all files: ").strip()
    if extensions_input:
        extensions = [ext.strip() for ext in extensions_input.split(',')]
    else:
        extensions = []

    output_file = input("Enter the output file path (e.g., combined_output.txt): ").strip()

    # Scan the directory and get file contents
    file_contents = scan_files(directory, extensions)

    # Write everything into one file
    write_combined_file(file_contents, output_file)

