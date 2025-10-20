// summaries.js - Handles the summaries page functionality

let currentSummary = null;

// Toggle the summary dropdown
function toggleSummaryDropdown() {
    const dropdown = document.getElementById('summaryDropdown');
    dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
}

// Load a specific topic summary
function loadSummary(topic) {
    currentSummary = topic;
    
    // Hide the dropdown
    document.getElementById('summaryDropdown').style.display = 'none';
    
    // Update the button text
    document.querySelector('.dropdown-btn').textContent = `📖 ${getTopicDisplayName(topic)}`;
    
    // Load and display the summary content
    const summaryContent = document.getElementById('summaryContent');
    summaryContent.innerHTML = getSummaryContent(topic);
    
    // Scroll to top of content
    summaryContent.scrollTop = 0;
}

// Get display name for topics
function getTopicDisplayName(topic) {
    const names = {
        'playwright': 'Playwright',
        'python': 'Python',
        'bash': 'Bash',
        'vim': 'Vim',
        'emacs': 'Emacs',
        'git': 'Git',
        'sql': 'SQL',
        'networking': 'Networking',
        'regular_expressions': 'Regular Expressions',
        'electron': 'Electron',
        'chrome_extensions': 'Chrome Extensions'
    };
    return names[topic] || topic;
}

// Get summary content for each topic
function getSummaryContent(topic) {
    const summaries = {
        'playwright': `
            <div class="summary-section">
                <h2>🎭 Playwright - Browser Automation Framework</h2>
                
                <h3>What is Playwright?</h3>
                <p>Playwright is a powerful Node.js library developed by Microsoft that enables you to automate Chromium, Firefox, and WebKit browsers with a single, unified API. It's designed for end-to-end testing and web automation, making it an excellent choice for developers who need reliable browser testing across multiple platforms.</p>
                
                <h3>Key Features</h3>
                <ul>
                    <li><strong>Multi-browser support:</strong> Works with Chromium, Firefox, and WebKit simultaneously</li>
                    <li><strong>Cross-language:</strong> Official support for JavaScript, TypeScript, Python, Java, and .NET</li>
                    <li><strong>Auto-waiting:</strong> Automatically waits for elements to be ready before performing actions</li>
                    <li><strong>Built-in test runner:</strong> Comprehensive testing framework included with fixtures and assertions</li>
                    <li><strong>Mobile emulation:</strong> Built-in device emulation for mobile testing scenarios</li>
                    <li><strong>Network interception:</strong> Mock and modify network requests for testing</li>
                    <li><strong>File handling:</strong> Upload files and handle downloads programmatically</li>
                    <li><strong>Dialog management:</strong> Handle alerts, confirms, and prompts automatically</li>
                </ul>
                
                <h3>Core Architecture</h3>
                <ul>
                    <li><strong>Browser:</strong> The main browser instance (Chromium, Firefox, or WebKit) that manages the browser process</li>
                    <li><strong>Context:</strong> A browser profile that can contain multiple pages, similar to an incognito session</li>
                    <li><strong>Page:</strong> A single tab within a browser context where you interact with web content</li>
                    <li><strong>Locator:</strong> A modern API for finding and interacting with elements robustly</li>
                    <li><strong>Frame:</strong> Individual frames within a page for complex web applications</li>
                </ul>
                
                <h3>Essential Operations</h3>
                <ul>
                    <li><strong>Browser Launch:</strong> <code>const browser = await playwright.chromium.launch()</code></li>
                    <li><strong>Context Creation:</strong> <code>const context = await browser.newContext()</code></li>
                    <li><strong>Page Creation:</strong> <code>const page = await context.newPage()</code></li>
                    <li><strong>Navigation:</strong> <code>await page.goto('https://example.com')</code></li>
                    <li><strong>Element Clicking:</strong> <code>await page.click('button#submit')</code></li>
                    <li><strong>Text Input:</strong> <code>await page.fill('input#name', 'William')</code></li>
                    <li><strong>Element Waiting:</strong> <code>await page.waitForSelector('selector')</code></li>
                    <li><strong>Screenshot Capture:</strong> <code>await page.screenshot({ path: 'screenshot.png' })</code></li>
                    <li><strong>Text Extraction:</strong> <code>await page.textContent('h1')</code></li>
                    <li><strong>Attribute Reading:</strong> <code>await page.getAttribute('img', 'src')</code></li>
                </ul>
                
                <h3>Advanced Element Interaction</h3>
                <ul>
                    <li><strong>Hover Effects:</strong> <code>await page.hover('button.dropdown')</code></li>
                    <li><strong>Drag and Drop:</strong> <code>await page.dragAndDrop('#source', '#target')</code></li>
                    <li><strong>Keyboard Input:</strong> <code>await page.keyboard.press('Enter')</code></li>
                    <li><strong>Mouse Operations:</strong> <code>await page.mouse.click(x, y)</code></li>
                    <li><strong>Select Options:</strong> <code>await page.selectOption('select#country', 'US')</code></li>
                    <li><strong>Checkbox Toggle:</strong> <code>await page.check('input[type="checkbox"]')</code></li>
                </ul>
                
                <h3>Testing Framework Features</h3>
                <ul>
                    <li><strong>Playwright Test:</strong> Built-in test runner with fixtures, assertions, and parallel execution</li>
                    <li><strong>Test Structure:</strong> <code>test('description', async ({ page }) => { ... })</code></li>
                    <li><strong>Test Groups:</strong> <code>test.describe('group name', () => { ... })</code></li>
                    <li><strong>Fixtures:</strong> Reusable test setup like login, browser context, etc.</li>
                    <li><strong>Parallel Execution:</strong> Tests run in parallel by default for faster execution</li>
                    <li><strong>Retry Logic:</strong> Configurable retry mechanisms for handling flaky tests</li>
                    <li><strong>Assertions:</strong> Built-in expect() function for comprehensive assertions</li>
                </ul>
                
                <h3>Network and Performance</h3>
                <ul>
                    <li><strong>Request Interception:</strong> <code>page.route('**/*', route => route.abort())</code></li>
                    <li><strong>Response Mocking:</strong> Mock API responses for consistent testing</li>
                    <li><strong>Performance Monitoring:</strong> Track page load times and resource usage</li>
                    <li><strong>Console Logging:</strong> <code>page.on('console', msg => console.log(msg.text()))</code></li>
                    <li><strong>Error Handling:</strong> Capture and analyze JavaScript errors</li>
                </ul>
                
                <h3>Mobile and Device Testing</h3>
                <ul>
                    <li><strong>Device Emulation:</strong> <code>browser.newContext({ ...playwright.devices['iPhone 12'] })</code></li>
                    <li><strong>Viewport Control:</strong> Set custom screen dimensions and orientations</li>
                    <li><strong>Touch Simulation:</strong> Simulate touch gestures for mobile testing</li>
                    <li><strong>Geolocation:</strong> Test location-based features</li>
                    <li><strong>Permissions:</strong> Handle camera, microphone, and other permissions</li>
                </ul>
                
                <h3>File and Media Handling</h3>
                <ul>
                    <li><strong>File Uploads:</strong> <code>page.setInputFiles('input[type=file]', 'file.txt')</code></li>
                    <li><strong>Downloads:</strong> Monitor and handle file downloads</li>
                    <li><strong>Image Capture:</strong> Take screenshots of specific elements or full pages</li>
                    <li><strong>PDF Generation:</strong> Generate PDFs from web pages</li>
                </ul>
                
                <h3>CI/CD Integration</h3>
                <ul>
                    <li><strong>GitHub Actions:</strong> Easy integration with GitHub CI/CD pipelines</li>
                    <li><strong>GitLab CI:</strong> Support for GitLab CI/CD workflows</li>
                    <li><strong>Docker Support:</strong> Run tests in containerized environments</li>
                    <li><strong>Parallel Execution:</strong> Scale tests across multiple machines</li>
                    <li><strong>Artifact Collection:</strong> Collect screenshots and videos from failed tests</li>
                </ul>
                
                <h3>Best Practices and Tips</h3>
                <ul>
                    <li><strong>Explicit Waits:</strong> Use explicit waits instead of fixed delays for better reliability</li>
                    <li><strong>Auto-waiting:</strong> Leverage Playwright's built-in auto-waiting for elements</li>
                    <li><strong>Locator Strategy:</strong> Use page.locator() for robust element selection</li>
                    <li><strong>Error Handling:</strong> Implement proper error handling and retry logic</li>
                    <li><strong>Headless Mode:</strong> Use headless mode in CI environments for better performance</li>
                    <li><strong>Test Isolation:</strong> Ensure each test is independent and doesn't affect others</li>
                    <li><strong>Resource Management:</strong> Properly close browsers and contexts to prevent memory leaks</li>
                    <li><strong>Debugging:</strong> Use <code>PWDEBUG=1</code> or <code>await page.pause()</code> for debugging</li>
                </ul>
                
                <h3>Common Use Cases</h3>
                <ul>
                    <li><strong>E-commerce Testing:</strong> Test shopping carts, checkout flows, and payment processes</li>
                    <li><strong>Form Validation:</strong> Test complex forms with various input scenarios</li>
                    <li><strong>API Testing:</strong> Test web APIs through browser interactions</li>
                    <li><strong>Performance Testing:</strong> Measure page load times and user experience</li>
                    <li><strong>Accessibility Testing:</strong> Ensure web applications are accessible to all users</li>
                    <li><strong>Cross-browser Testing:</strong> Ensure consistent behavior across different browsers</li>
                </ul>
            </div>
        `,
        
        'python': `
            <div class="summary-section">
                <h2>🐍 Python - Programming Language</h2>
                
                <h3>What is Python?</h3>
                <p>Python is a high-level, interpreted programming language created by Guido van Rossum in 1991. It's known for its simplicity, readability, and versatility, making it an excellent choice for beginners and experienced developers alike. Python emphasizes code readability with its clean syntax and extensive use of whitespace.</p>
                
                <h3>Core Philosophy</h3>
                <ul>
                    <li><strong>Explicit is better than implicit</strong> - Code should be clear and obvious</li>
                    <li><strong>Simple is better than complex</strong> - Avoid unnecessary complexity</li>
                    <li><strong>Readability counts</strong> - Code should be easy to read and understand</li>
                    <li><strong>There should be one obvious way to do it</strong> - Python encourages consistent approaches</li>
                </ul>
                
                <h3>Key Features</h3>
                <ul>
                    <li><strong>Readable syntax:</strong> Clean, English-like code structure that reads like pseudocode</li>
                    <li><strong>Dynamic typing:</strong> Variables can change types automatically during execution</li>
                    <li><strong>Rich standard library:</strong> Extensive built-in modules and functions for common tasks</li>
                    <li><strong>Cross-platform:</strong> Runs on Windows, macOS, Linux, and many other operating systems</li>
                    <li><strong>Large ecosystem:</strong> Thousands of third-party packages available via pip package manager</li>
                    <li><strong>Automatic memory management:</strong> Garbage collection handles memory allocation and deallocation</li>
                    <li><strong>Multiple programming paradigms:</strong> Supports procedural, object-oriented, and functional programming</li>
                </ul>
                
                <h3>Core Data Types and Structures</h3>
                <ul>
                    <li><strong>Numbers:</strong> int (integers), float (floating-point), complex (complex numbers)</li>
                    <li><strong>Strings:</strong> Immutable text data with rich manipulation methods and slicing</li>
                    <li><strong>Lists:</strong> Mutable, ordered collections that can contain mixed data types</li>
                    <li><strong>Tuples:</strong> Immutable, ordered collections, often used for data that shouldn't change</li>
                    <li><strong>Dictionaries:</strong> Mutable key-value pairs, excellent for fast lookups and data organization</li>
                    <li><strong>Sets:</strong> Unordered collections of unique elements, great for mathematical operations</li>
                    <li><strong>Boolean:</strong> True and False values for logical operations</li>
                    <li><strong>None:</strong> Represents absence of value or null</li>
                </ul>
                
                <h3>Control Structures and Flow</h3>
                <ul>
                    <li><strong>Conditionals:</strong> if, elif, else statements with proper indentation</li>
                    <li><strong>Loops:</strong> for loops (iterate over sequences) and while loops (conditional iteration)</li>
                    <li><strong>Loop control:</strong> break (exit loop), continue (skip iteration), pass (do nothing)</li>
                    <li><strong>Exception handling:</strong> try, except, finally, else blocks for robust error handling</li>
                    <li><strong>Context managers:</strong> with statements for automatic resource management</li>
                </ul>
                
                <h3>Functions and Modularity</h3>
                <ul>
                    <li><strong>Function definition:</strong> <code>def function_name(parameters):</code></li>
                    <li><strong>Parameters:</strong> Positional, keyword, default, and variable-length arguments</li>
                    <li><strong>Return values:</strong> Functions can return multiple values as tuples</li>
                    <li><strong>Lambda functions:</strong> Anonymous functions for simple operations</li>
                    <li><strong>Decorators:</strong> Functions that modify other functions</li>
                    <li><strong>Modules:</strong> Organize code into reusable files</li>
                    <li><strong>Packages:</strong> Organize modules into directories</li>
                </ul>
                
                <h3>Object-Oriented Programming</h3>
                <ul>
                    <li><strong>Classes:</strong> Blueprints for creating objects with attributes and methods</li>
                    <li><strong>Inheritance:</strong> Create new classes based on existing ones</li>
                    <li><strong>Encapsulation:</strong> Bundle data and methods that operate on that data</li>
                    <li><strong>Polymorphism:</strong> Different classes can have methods with the same name</li>
                    <li><strong>Magic methods:</strong> Special methods like <code>__init__</code>, <code>__str__</code>, <code>__len__</code></li>
                </ul>
                
                <h3>Advanced Features</h3>
                <ul>
                    <li><strong>List comprehensions:</strong> Concise way to create lists: <code>[x**2 for x in range(10)]</code></li>
                    <li><strong>Generator expressions:</strong> Memory-efficient iteration over large datasets</li>
                    <li><strong>Iterators and generators:</strong> Custom iteration behavior with yield statements</li>
                    <li><strong>Decorators:</strong> Modify functions or classes without changing their source code</li>
                    <li><strong>Context managers:</strong> Automatic setup and cleanup with with statements</li>
                    <li><strong>Type hints:</strong> Optional type annotations for better code documentation</li>
                </ul>
                
                <h3>File and Data Handling</h3>
                <ul>
                    <li><strong>File operations:</strong> open(), read(), write(), close() with automatic resource management</li>
                    <li><strong>CSV processing:</strong> Built-in csv module for comma-separated values</li>
                    <li><strong>JSON handling:</strong> json module for JavaScript Object Notation data</li>
                    <li><strong>Regular expressions:</strong> re module for pattern matching and text processing</li>
                    <li><strong>Database connectivity:</strong> Support for SQLite, MySQL, PostgreSQL, and more</li>
                </ul>
                
                <h3>Popular Libraries and Frameworks</h3>
                <ul>
                    <li><strong>Web Development:</strong> Django (full-stack), Flask (micro), FastAPI (modern, fast)</li>
                    <li><strong>Data Science:</strong> NumPy (numerical computing), Pandas (data manipulation), Matplotlib (plotting)</li>
                    <li><strong>Machine Learning:</strong> TensorFlow, PyTorch, Scikit-learn (classification, regression, clustering)</li>
                    <li><strong>Web Scraping:</strong> Beautiful Soup, Scrapy, Selenium for automated data collection</li>
                    <li><strong>API Development:</strong> FastAPI, Flask-RESTful, Django REST framework</li>
                    <li><strong>Testing:</strong> pytest, unittest for automated testing</li>
                    <li><strong>DevOps:</strong> Ansible, SaltStack for infrastructure automation</li>
                </ul>
                
                <h3>Development Tools and Environment</h3>
                <ul>
                    <li><strong>Package management:</strong> pip for installing packages, virtual environments for isolation</li>
                    <li><strong>IDEs and editors:</strong> PyCharm, VS Code, Jupyter Notebooks, Vim/Emacs</li>
                    <li><strong>Code quality:</strong> flake8, black, pylint for code formatting and linting</li>
                    <li><strong>Testing frameworks:</strong> pytest, unittest, coverage for comprehensive testing</li>
                    <li><strong>Documentation:</strong> Sphinx, pydoc for generating documentation</li>
                </ul>
                
                <h3>Best Practices</h3>
                <ul>
                    <li><strong>PEP 8:</strong> Follow Python style guide for consistent code formatting</li>
                    <li><strong>Docstrings:</strong> Document functions and classes with clear descriptions</li>
                    <li><strong>Error handling:</strong> Use specific exception types and provide meaningful error messages</li>
                    <li><strong>Testing:</strong> Write tests for your code to ensure reliability</li>
                    <li><strong>Virtual environments:</strong> Use venv or conda to isolate project dependencies</li>
                    <li><strong>Type hints:</strong> Add optional type annotations for better code clarity</li>
                    <li><strong>Code organization:</strong> Structure projects with clear module and package organization</li>
                </ul>
                
                <h3>Common Use Cases</h3>
                <ul>
                    <li><strong>Web applications:</strong> Build dynamic websites and web services</li>
                    <li><strong>Data analysis:</strong> Process and analyze large datasets</li>
                    <li><strong>Automation scripts:</strong> Automate repetitive tasks and system administration</li>
                    <li><strong>Scientific computing:</strong> Perform complex mathematical calculations and simulations</li>
                    <li><strong>Machine learning:</strong> Develop AI models and predictive analytics</li>
                    <li><strong>Desktop applications:</strong> Create GUI applications with tkinter, PyQt, or Kivy</li>
                    <li><strong>API development:</strong> Build RESTful APIs and microservices</li>
                </ul>
            </div>
        `,
        
        'bash': `
            <div class="summary-section">
                <h2>💻 Bash - Command Line Shell</h2>
                
                <h3>What is Bash?</h3>
                <p>Bash (Bourne Again Shell) is a command-line shell and scripting language that provides a text-based interface to interact with Unix-like operating systems. It's the default shell on most Linux distributions, macOS, and many other Unix-based systems. Bash combines the features of the original Bourne shell with additional capabilities from the C shell and Korn shell.</p>
                
                <h3>Core Concepts</h3>
                <ul>
                    <li><strong>Shell:</strong> A program that interprets commands and provides an interface to the operating system</li>
                    <li><strong>Terminal:</strong> The graphical interface that runs the shell</li>
                    <li><strong>Command line:</strong> The text-based interface where you type commands</li>
                    <li><strong>Process:</strong> A running instance of a program</li>
                    <li><strong>File system:</strong> Hierarchical organization of files and directories</li>
                </ul>
                
                <h3>Key Features and Capabilities</h3>
                <ul>
                    <li><strong>Command execution:</strong> Run programs, scripts, and built-in commands</li>
                    <li><strong>File manipulation:</strong> Create, copy, move, delete, and organize files and directories</li>
                    <li><strong>Process management:</strong> Start, stop, monitor, and control running processes</li>
                    <li><strong>Text processing:</strong> Search, filter, transform, and manipulate text data</li>
                    <li><strong>Automation:</strong> Write scripts to automate repetitive tasks and system administration</li>
                    <li><strong>Job control:</strong> Manage multiple processes and background tasks</li>
                    <li><strong>Command history:</strong> Recall and reuse previous commands</li>
                    <li><strong>Tab completion:</strong> Automatically complete commands and file names</li>
                </ul>
                
                <h3>Essential Navigation Commands</h3>
                <ul>
                    <li><strong>pwd (Print Working Directory):</strong> Shows your current directory location</li>
                    <li><strong>ls (List):</strong> Lists files and directories in the current location</li>
                    <li><strong>cd (Change Directory):</strong> Moves you to a different directory</li>
                    <li><strong>cd ..:</strong> Moves up one directory level</li>
                    <li><strong>cd ~:</strong> Moves to your home directory</li>
                    <li><strong>cd /:</strong> Moves to the root directory</li>
                    <li><strong>cd -:</strong> Returns to the previous directory</li>
                </ul>
                
                <h3>File and Directory Operations</h3>
                <ul>
                    <li><strong>mkdir (Make Directory):</strong> Creates new directories</li>
                    <li><strong>rmdir (Remove Directory):</strong> Removes empty directories</li>
                    <li><strong>rm (Remove):</strong> Deletes files and directories</li>
                    <li><strong>cp (Copy):</strong> Copies files and directories</li>
                    <li><strong>mv (Move):</strong> Moves or renames files and directories</li>
                    <li><strong>touch:</strong> Creates empty files or updates file timestamps</li>
                    <li><strong>ln (Link):</strong> Creates symbolic or hard links</li>
                </ul>
                
                <h3>File Viewing and Editing</h3>
                <ul>
                    <li><strong>cat (Concatenate):</strong> Displays file contents or combines multiple files</li>
                    <li><strong>less:</strong> Views file contents with pagination and search</li>
                    <li><strong>more:</strong> Simple pagination for viewing files</li>
                    <li><strong>head:</strong> Shows the first few lines of a file</li>
                    <li><strong>tail:</strong> Shows the last few lines of a file</li>
                    <li><strong>nano:</strong> Simple text editor for quick edits</li>
                    <li><strong>vim/vi:</strong> Advanced text editor with powerful features</li>
                </ul>
                
                <h3>Searching and Filtering</h3>
                <ul>
                    <li><strong>grep (Global Regular Expression Print):</strong> Searches for patterns in text</li>
                    <li><strong>find:</strong> Locates files and directories based on various criteria</li>
                    <li><strong>locate:</strong> Fast file location using a database</li>
                    <li><strong>which:</strong> Shows the full path of commands</li>
                    <li><strong>whereis:</strong> Locates binary, source, and manual files</li>
                    <li><strong>type:</strong> Shows how a command is interpreted</li>
                </ul>
                
                <h3>Process Management</h3>
                <ul>
                    <li><strong>ps (Process Status):</strong> Shows running processes</li>
                    <li><strong>top:</strong> Interactive process monitor with real-time updates</li>
                    <li><strong>htop:</strong> Enhanced version of top with better interface</li>
                    <li><strong>kill:</strong> Terminates processes by PID or name</li>
                    <li><strong>pkill:</strong> Kills processes by name</li>
                    <li><strong>killall:</strong> Kills all processes with a specific name</li>
                    <li><strong>jobs:</strong> Shows background jobs in the current shell</li>
                    <li><strong>fg/bg:</strong> Brings jobs to foreground/background</li>
                </ul>
                
                <h3>Redirection and Pipes</h3>
                <ul>
                    <li><strong>Output redirection:</strong> > (overwrite), >> (append)</li>
                    <li><strong>Input redirection:</strong> < (read from file)</li>
                    <li><strong>Pipes:</strong> | (connect command output to input)</li>
                    <li><strong>Error redirection:</strong> 2>&1 (combine stdout and stderr)</li>
                    <strong>Here documents:</strong> << (input multiple lines)</li>
                    <li><strong>Process substitution:</strong> <() and >() for command output as files</li>
                </ul>
                
                <h3>Text Processing and Manipulation</h3>
                <ul>
                    <li><strong>sed (Stream Editor):</strong> Performs text transformations on input streams</li>
                    <li><strong>awk:</strong> Pattern scanning and text processing language</li>
                    <li><strong>cut:</strong> Removes sections from lines of files</li>
                    <li><strong>paste:</strong> Merges lines from multiple files</li>
                    <li><strong>sort:</strong> Sorts lines in text files</li>
                    <li><strong>uniq:</strong> Removes duplicate lines from sorted files</li>
                    <li><strong>wc (Word Count):</strong> Counts lines, words, and characters</li>
                    <li><strong>tr (Translate):</strong> Translates or deletes characters</li>
                </ul>
                
                <h3>System Information and Monitoring</h3>
                <ul>
                    <li><strong>uname:</strong> Shows system information</li>
                    <li><strong>whoami:</strong> Displays current username</li>
                    <li><strong>id:</strong> Shows user and group information</li>
                    <li><strong>df (Disk Free):</strong> Shows disk space usage</li>
                    <li><strong>du (Disk Usage):</strong> Shows directory space usage</li>
                    <li><strong>free:</strong> Shows memory usage</li>
                    <li><strong>uptime:</strong> Shows system uptime and load</li>
                    <li><strong>date:</strong> Shows current date and time</li>
                </ul>
                
                <h3>Bash Scripting Fundamentals</h3>
                <ul>
                    <li><strong>Shebang:</strong> #!/bin/bash at the start of scripts</li>
                    <li><strong>Variables:</strong> Store and reference data: <code>name="value"</code></li>
                    <li><strong>Parameter expansion:</strong> Access variables with $: <code>$variable</code></li>
                    <li><strong>Command substitution:</strong> Use command output: <code>$(command)</code></li>
                    <li><strong>Arithmetic:</strong> Perform calculations: <code>$((expression))</code></li>
                    <li><strong>String operations:</strong> Manipulate strings with built-in operators</li>
                </ul>
                
                <h3>Control Structures</h3>
                <ul>
                    <li><strong>Conditionals:</strong> if, elif, else statements with test conditions</li>
                    <li><strong>Case statements:</strong> Multi-way branching based on pattern matching</li>
                    <li><strong>Loops:</strong> for, while, and until loops for iteration</li>
                    <li><strong>Functions:</strong> Define reusable code blocks</li>
                    <li><strong>Error handling:</strong> trap commands for signal handling</li>
                </ul>
                
                <h3>Advanced Scripting Features</h3>
                <ul>
                    <li><strong>Arrays:</strong> Store multiple values in indexed variables</li>
                    <li><strong>Associative arrays:</strong> Key-value pairs (Bash 4.0+)</li>
                    <li><strong>Local variables:</strong> Variables scoped to functions</li>
                    <li><strong>Read-only variables:</strong> Constants that cannot be modified</li>
                    <li><strong>Export variables:</strong> Make variables available to child processes</li>
                    <li><strong>Source command:</strong> Execute scripts in the current shell context</li>
                </ul>
                
                <h3>Environment and Configuration</h3>
                <ul>
                    <li><strong>Environment variables:</strong> Set with export, view with env or printenv</li>
                    <li><strong>Configuration files:</strong> .bashrc, .bash_profile, .bash_login</li>
                    <li><strong>Aliases:</strong> Create shortcuts for commands: <code>alias ll='ls -la'</code></li>
                    <li><strong>Functions:</strong> Define custom commands in configuration files</li>
                    <li><strong>History:</strong> Command history with history command and ! expansion</li>
                    <li><strong>Tab completion:</strong> Automatically complete commands and file names</li>
                </ul>
                
                <h3>Best Practices</h3>
                <ul>
                    <li><strong>Use quotes:</strong> Always quote variables to handle spaces and special characters</li>
                    <li><strong>Error checking:</strong> Check exit codes and handle errors gracefully</li>
                    <li><strong>Security:</strong> Be careful with eval and command substitution</li>
                    <li><strong>Portability:</strong> Use POSIX-compliant syntax when possible</li>
                    <li><strong>Documentation:</strong> Add comments and help text to scripts</li>
                    <li><strong>Testing:</strong> Test scripts with various inputs and edge cases</li>
                </ul>
                
                <h3>Common Use Cases</h3>
                <ul>
                    <li><strong>System administration:</strong> Automate routine maintenance tasks</li>
                    <li><strong>Log processing:</strong> Parse and analyze log files</li>
                    <li><strong>File management:</strong> Organize and process large numbers of files</li>
                    <li><strong>Deployment scripts:</strong> Automate software deployment processes</li>
                    <li><strong>Monitoring:</strong> Create system monitoring and alerting scripts</li>
                    <li><strong>Data processing:</strong> Transform and analyze data files</li>
                    <li><strong>Backup automation:</strong> Create automated backup systems</li>
                </ul>
            </div>
        `,
        
        'vim': `
            <div class="summary-section">
                <h2>📝 Vim - Text Editor</h2>
                
                <h3>What is Vim?</h3>
                <p>Vim (Vi IMproved) is a highly configurable, modal text editor designed for efficient text editing. It's available on virtually all Unix-like systems, including Linux, macOS, and Windows. Vim is an enhanced version of the original Vi editor, created by Bill Joy in 1976. It's known for its powerful features, extensive customization options, and steep learning curve that rewards dedicated users with unparalleled editing efficiency.</p>
                
                <h3>Philosophy and Design Principles</h3>
                <ul>
                    <li><strong>Modal editing:</strong> Different modes for different types of operations</li>
                    <li><strong>Command-driven:</strong> Most operations are performed via keyboard commands</li>
                    <li><strong>Extensible:</strong> Highly customizable with plugins, scripts, and configuration</li>
                    <li><strong>Efficient:</strong> Minimal keystrokes for complex operations</li>
                    <li><strong>Keyboard-centric:</strong> Designed to keep hands on the keyboard</li>
                    <li><strong>Composable:</strong> Commands can be combined and repeated</li>
                </ul>
                
                <h3>Core Modes and Their Purposes</h3>
                <ul>
                    <li><strong>Normal mode:</strong> Default mode for navigation, commands, and text manipulation</li>
                    <li><strong>Insert mode:</strong> For typing and editing text content</li>
                    <li><strong>Visual mode:</strong> For selecting text blocks and regions</li>
                    <li><strong>Command mode:</strong> For executing commands and entering file operations</li>
                    <li><strong>Replace mode:</strong> For overwriting text character by character</li>
                    <li><strong>Terminal mode:</strong> For running terminal commands within Vim</li>
                </ul>
                
                <h3>Mode Switching Commands</h3>
                <ul>
                    <li><strong>i:</strong> Enter insert mode before cursor</li>
                    <li><strong>a:</strong> Enter insert mode after cursor</li>
                    <li><strong>o:</strong> Open new line below and enter insert mode</li>
                    <li><strong>O:</strong> Open new line above and enter insert mode</li>
                    <li><strong>v:</strong> Enter visual mode for character selection</li>
                    <li><strong>V:</strong> Enter visual mode for line selection</li>
                    <li><strong>Ctrl+v:</strong> Enter visual block mode</li>
                    <li><strong>:</strong> Enter command mode</li>
                    <li><strong>Esc:</strong> Return to normal mode from any mode</li>
                </ul>
                
                <h3>Navigation Commands (Normal Mode)</h3>
                <ul>
                    <li><strong>h, j, k, l:</strong> Move left, down, up, right (respectively)</li>
                    <li><strong>w:</strong> Move to beginning of next word</li>
                    <li><strong>b:</strong> Move to beginning of previous word</li>
                    <li><strong>e:</strong> Move to end of current word</li>
                    <li><strong>0:</strong> Move to beginning of line</li>
                    <li><strong>^:</strong> Move to first non-blank character of line</li>
                    <li><strong>$:</strong> Move to end of line</li>
                    <li><strong>gg:</strong> Move to beginning of file</li>
                    <li><strong>G:</strong> Move to end of file</li>
                    <li><strong>nG:</strong> Move to line number n</li>
                    <li><strong>Ctrl+f:</strong> Page down</li>
                    <li><strong>Ctrl+b:</strong> Page up</li>
                </ul>
                
                <h3>Text Manipulation Commands</h3>
                <ul>
                    <li><strong>dd:</strong> Delete current line</li>
                    <li><strong>yy:</strong> Yank (copy) current line</li>
                    <li><strong>p:</strong> Paste after cursor</li>
                    <li><strong>P:</strong> Paste before cursor</li>
                    <li><strong>x:</strong> Delete character under cursor</li>
                    <li><strong>X:</strong> Delete character before cursor</li>
                    <li><strong>dw:</strong> Delete word from cursor to end</li>
                    <li><strong>db:</strong> Delete word from cursor to beginning</li>
                    <li><strong>d$:</strong> Delete from cursor to end of line</li>
                    <li><strong>d0:</strong> Delete from cursor to beginning of line</li>
                </ul>
                
                <h3>Search and Replace</h3>
                <ul>
                    <li><strong>/pattern:</strong> Search forward for pattern</li>
                    <li><strong>?pattern:</strong> Search backward for pattern</li>
                    <li><strong>n:</strong> Find next occurrence</li>
                    <li><strong>N:</strong> Find previous occurrence</li>
                    <li><strong>*:</strong> Search for word under cursor</li>
                    <li><strong>#:</strong> Search backward for word under cursor</li>
                    <li><strong>:%s/old/new/g:</strong> Replace all occurrences globally</li>
                    <li><strong>:%s/old/new/gc:</strong> Replace with confirmation</li>
                </ul>
                
                <h3>File Operations (Command Mode)</h3>
                <ul>
                    <li><strong>:w:</strong> Save current file</li>
                    <li><strong>:w filename:</strong> Save as new filename</li>
                    <li><strong>:q:</strong> Quit Vim</li>
                    <li><strong>:q!:</strong> Quit without saving</li>
                    <li><strong>:wq:</strong> Save and quit</li>
                    <li><strong>:x:</strong> Save and quit (only if modified)</li>
                    <li><strong>:e filename:</strong> Edit another file</li>
                    <li><strong>:sp filename:</strong> Split window and edit file</li>
                    <li><strong>:vsp filename:</strong> Vertical split and edit file</li>
                </ul>
                
                <h3>Window and Buffer Management</h3>
                <ul>
                    <li><strong>Ctrl+w h/j/k/l:</strong> Navigate between windows</li>
                    <li><strong>Ctrl+w s:</strong> Split window horizontally</li>
                    <li><strong>Ctrl+w v:</strong> Split window vertically</li>
                    <li><strong>Ctrl+w c:</strong> Close current window</li>
                    <li><strong>Ctrl+w o:</strong> Close other windows (keep only current)</li>
                    <li><strong>:ls:</strong> List all buffers</li>
                    <li><strong>:b n:</strong> Switch to buffer number n</li>
                    <li><strong>:b filename:</strong> Switch to buffer by filename</li>
                </ul>
                
                <h3>Advanced Editing Features</h3>
                <ul>
                    <li><strong>Macros:</strong> Record and replay sequences of commands</li>
                    <li><strong>Registers:</strong> Multiple clipboards for storing text</li>
                    <li><strong>Marks:</strong> Set and jump to specific locations in files</li>
                    <li><strong>Folds:</strong> Collapse and expand sections of code</li>
                    <li><strong>Tags:</strong> Jump to function definitions and declarations</li>
                    <li><strong>Auto-completion:</strong> Complete words and lines automatically</li>
                </ul>
                
                <h3>Macro Recording and Playback</h3>
                <ul>
                    <li><strong>q letter:</strong> Start recording macro to register 'letter'</li>
                    <li><strong>q:</strong> Stop recording macro</li>
                    <li><strong>@ letter:</strong> Execute macro from register 'letter'</strong>
                    <li><strong>@@:</strong> Repeat last executed macro</strong>
                    <li><strong>n@ letter:</strong> Execute macro 'n' times</strong>
                </ul>
                
                <h3>Registers and Clipboards</h3>
                <ul>
                    <li><strong>" letter y:</strong> Yank to named register</li>
                    <li><strong>" letter p:</strong> Paste from named register</li>
                    <li><strong>:registers:</strong> Show contents of all registers</li>
                    <li><strong>"+y:</strong> Yank to system clipboard</li>
                    <li><strong>"+p:</strong> Paste from system clipboard</li>
                    <li><strong>0 register:</strong> Contains last yanked text</li>
                    <li><strong>1-9 registers:</strong> Contains deletion history</li>
                </ul>
                
                <h3>Configuration and Customization</h3>
                <ul>
                    <li><strong>.vimrc:</strong> Main configuration file</strong>
                    <li><strong>set option:</strong> Enable an option</strong>
                    <li><strong>set nooption:</strong> Disable an option</strong>
                    <li><strong>set option=value:</strong> Set option to specific value</strong>
                    <li><strong>map key command:</strong> Create custom key mappings</strong>
                    <li><strong>autocmd:</strong> Execute commands automatically</strong>
                    <li><strong>syntax on:</strong> Enable syntax highlighting</strong>
                    <li><strong>colorscheme name:</strong> Change color scheme</strong>
                </ul>
                
                <h3>Essential Configuration Options</h3>
                <ul>
                    <li><strong>set number:</strong> Show line numbers</li>
                    <li><strong>set relativenumber:</strong> Show relative line numbers</li>
                    <li><strong>set autoindent:</strong> Auto-indent new lines</li>
                    <li><strong>set expandtab:</strong> Use spaces instead of tabs</li>
                    <li><strong>set tabstop=4:</strong> Set tab width to 4 spaces</li>
                    <li><strong>set shiftwidth=4:</strong> Set indentation width</li>
                    <li><strong>set ignorecase:</strong> Ignore case in searches</li>
                    <li><strong>set smartcase:</strong> Override ignorecase when pattern contains uppercase</li>
                </ul>
                
                <h3>Plugin Management</h3>
                <ul>
                    <li><strong>Vim-Plug:</strong> Popular plugin manager</li>
                    <li><strong>Pathogen:</strong> Simple plugin manager</li>
                    <li><strong>Vundle:</strong> Plugin manager with Git integration</li>
                    <li><strong>NeoBundle:</strong> Advanced plugin manager</li>
                    <li><strong>vim-plugins:</strong> Built-in plugin system</li>
                </ul>
                
                <h3>Best Practices and Tips</h3>
                <ul>
                    <li><strong>Learn incrementally:</strong> Start with basic commands and gradually add more</li>
                    <li><strong>Use normal mode:</strong> Spend most time in normal mode, not insert mode</li>
                    <li><strong>Combine commands:</strong> Learn to combine commands for powerful operations</li>
                    <li><strong>Use visual mode:</strong> Select text before performing operations</li>
                    <li><strong>Practice regularly:</strong> Regular practice helps build muscle memory</li>
                    <li><strong>Customize gradually:</strong> Add customizations as you become more comfortable</li>
                    <li><strong>Use help system:</strong> :help command provides comprehensive documentation</li>
                </ul>
                
                <h3>Common Use Cases</h3>
                <ul>
                    <li><strong>Code editing:</strong> Write and modify source code efficiently</li>
                    <li><strong>Configuration files:</strong> Edit system and application configs</li>
                    <li><strong>Log analysis:</strong> Navigate and search through log files</li>
                    <li><strong>Documentation:</strong> Write and edit technical documentation</li>
                    <li><strong>System administration:</strong> Edit files on remote servers</li>
                    <li><strong>Text processing:</strong> Transform and manipulate text data</li>
                </ul>
            </div>
        `,
        
        'git': `
            <div class="summary-section">
                <h2>📚 Git - Version Control System</h2>
                
                <h3>What is Git?</h3>
                <p>Git is a distributed version control system created by Linus Torvalds in 2005 for managing the Linux kernel development. It tracks changes in source code during software development, allowing multiple developers to work on the same project simultaneously while maintaining a complete history of changes. Git is designed to be fast, efficient, and handle projects of any size.</p>
                
                <h3>Core Philosophy</h3>
                <ul>
                    <li><strong>Distributed:</strong> Every developer has a complete copy of the repository</li>
                    <li><strong>Fast and efficient:</strong> Optimized for speed and performance</li>
                    <li><strong>Data integrity:</strong> SHA-1 hashing ensures data integrity</li>
                    <li><strong>Branching model:</strong> Encourages lightweight branching and merging</li>
                    <li><strong>Staging area:</strong> Precise control over what gets committed</li>
                </ul>
                
                <h3>Key Concepts and Architecture</h3>
                <ul>
                    <li><strong>Repository:</strong> A directory containing your project and Git metadata (.git folder)</li>
                    <li><strong>Working Directory:</strong> The actual files you see and edit</li>
                    <li><strong>Staging Area:</strong> A buffer that holds changes before they're committed</li>
                    <li><strong>Commit:</strong> A snapshot of your project at a specific point in time</li>
                    <li><strong>Branch:</strong> A separate line of development that diverges from the main line</li>
                    <li><strong>Merge:</strong> Combining changes from different branches</li>
                    <li><strong>Remote:</strong> A copy of your repository hosted elsewhere (GitHub, GitLab, etc.)</li>
                    <li><strong>Clone:</strong> A copy of a remote repository on your local machine</li>
                </ul>
                
                <h3>Essential Commands and Operations</h3>
                <ul>
                    <li><strong>Initialization:</strong> <code>git init</code> (create new repo), <code>git clone</code> (copy existing repo)</li>
                    <li><strong>File tracking:</strong> <code>git add</code> (stage files), <code>git rm</code> (remove files)</li>
                    <li><strong>Staging:</strong> <code>git add .</code> (stage all changes), <code>git reset</code> (unstage changes)</li>
                    <li><strong>Committing:</strong> <code>git commit -m "message"</code> (create commit)</li>
                    <li><strong>Status and history:</strong> <code>git status</code>, <code>git log</code>, <code>git diff</code></li>
                    <li><strong>Branching:</strong> <code>git branch</code>, <code>git checkout</code>, <code>git merge</code></li>
                    <li><strong>Remote operations:</strong> <code>git push</code>, <code>git pull</code>, <code>git fetch</code></li>
                </ul>
                
                <h3>Branching and Merging Strategies</h3>
                <ul>
                    <li><strong>Feature branches:</strong> Create separate branches for new features</li>
                    <li><strong>Release branches:</strong> Prepare stable releases</li>
                    <li><strong>Hotfix branches:</strong> Fix critical issues in production</li>
                    <li><strong>Fast-forward merge:</strong> Simple merge when no conflicts exist</li>
                    <li><strong>Three-way merge:</strong> Complex merge creating a merge commit</li>
                    <li><strong>Rebase:</strong> Replay commits on top of another branch</li>
                </ul>
                
                <h3>Advanced Git Features</h3>
                <ul>
                    <li><strong>Stashing:</strong> Temporarily save changes without committing</li>
                    <li><strong>Cherry-picking:</strong> Apply specific commits from other branches</li>
                    <li><strong>Interactive rebase:</strong> Edit, reorder, or squash commits</li>
                    <li><strong>Submodules:</strong> Include other repositories within your project</li>
                    <li><strong>Git hooks:</strong> Automate actions before/after Git operations</li>
                    <li><strong>Git bisect:</strong> Find which commit introduced a bug</li>
                </ul>
                
                <h3>Best Practices</h3>
                <ul>
                    <li><strong>Commit messages:</strong> Write clear, descriptive commit messages</li>
                    <li><strong>Small commits:</strong> Make atomic commits that do one thing</li>
                    <li><strong>Regular commits:</strong> Commit frequently to maintain history</li>
                    <li><strong>Branch naming:</strong> Use descriptive branch names (feature/, bugfix/, etc.)</li>
                    <li><strong>Pull before push:</strong> Always pull latest changes before pushing</li>
                    <li><strong>Code review:</strong> Use pull requests for code review</li>
                </ul>
            </div>
        `,
        
        'sql': `
            <div class="summary-section">
                <h2>🗄️ SQL - Structured Query Language</h2>
                
                <h3>What is SQL?</h3>
                <p>SQL (Structured Query Language) is a standard language for managing and manipulating relational databases. It's used to create, read, update, and delete data in database systems like MySQL, PostgreSQL, SQLite, and Oracle.</p>
                
                <h3>Key Concepts</h3>
                <ul>
                    <li><strong>Tables:</strong> Collections of related data organized in rows and columns</li>
                    <li><strong>Relationships:</strong> Connections between tables using foreign keys</li>
                    <li><strong>Constraints:</strong> Rules that ensure data integrity</li>
                    <li><strong>Indexes:</strong> Structures that improve query performance</li>
                </ul>
                
                <h3>Core Operations (CRUD)</h3>
                <ul>
                    <li><strong>CREATE:</strong> INSERT statements to add new data</li>
                    <li><strong>READ:</strong> SELECT statements to retrieve data</li>
                    <li><strong>UPDATE:</strong> UPDATE statements to modify existing data</li>
                    <li><strong>DELETE:</strong> DELETE statements to remove data</li>
                </ul>
                
                <h3>Common Clauses</h3>
                <ul>
                    <li><strong>WHERE:</strong> Filter results based on conditions</li>
                    <li><strong>ORDER BY:</strong> Sort results by specified columns</li>
                    <li><strong>GROUP BY:</strong> Group results by column values</li>
                    <li><strong>HAVING:</strong> Filter grouped results</li>
                    <li><strong>JOIN:</strong> Combine data from multiple tables</li>
                </ul>
            </div>
        `,
        
        'networking': `
            <div class="summary-section">
                <h2>🌐 Networking - Computer Networks</h2>
                
                <h3>What is Networking?</h3>
                <p>Computer networking is the practice of connecting computers and other devices to share resources and communicate. It involves understanding protocols, addressing, routing, and security.</p>
                
                <h3>Key Concepts</h3>
                <ul>
                    <li><strong>Protocols:</strong> Rules that govern data communication</li>
                    <li><strong>IP Addresses:</strong> Unique identifiers for devices on a network</li>
                    <li><strong>Ports:</strong> Endpoints for specific services or applications</li>
                    <li><strong>DNS:</strong> System that translates domain names to IP addresses</li>
                </ul>
                
                <h3>Common Protocols</h3>
                <ul>
                    <li><strong>HTTP/HTTPS:</strong> Web communication protocols</li>
                    <li><strong>TCP/UDP:</strong> Transport layer protocols</li>
                    <li><strong>FTP:</strong> File transfer protocol</li>
                    <li><strong>SSH:</strong> Secure shell for remote access</li>
                </ul>
            </div>
        `,
        
        'regular_expressions': `
            <div class="summary-section">
                <h2>🔍 Regular Expressions - Pattern Matching</h2>
                
                <h3>What are Regular Expressions?</h3>
                <p>Regular expressions (regex) are patterns used to match character combinations in strings. They're powerful tools for searching, editing, and manipulating text data.</p>
                
                <h3>Key Concepts</h3>
                <ul>
                    <li><strong>Literals:</strong> Exact character matches</li>
                    <li><strong>Metacharacters:</strong> Special characters with special meanings</li>
                    <li><strong>Quantifiers:</strong> Specify how many times a pattern can occur</li>
                    <li><strong>Character classes:</strong> Match any character from a set</li>
                </ul>
                
                <h3>Common Metacharacters</h3>
                <ul>
                    <li><strong>.</strong> Matches any single character (except newline)</li>
                    <li><strong>^</strong> Start of string or line</li>
                    <li><strong>$</strong> End of string or line</li>
                    <li><strong>*</strong> Zero or more of the preceding element</li>
                    <li><strong>+</strong> One or more of the preceding element</li>
                    <li><strong>?</strong> Zero or one of the preceding element</li>
                </ul>
            </div>
        `,
        
        'electron': `
            <div class="summary-section">
                <h2>⚡ Electron - Cross-Platform Desktop Apps</h2>
                
                <h3>What is Electron?</h3>
                <p>Electron is a framework that allows you to build cross-platform desktop applications using web technologies like HTML, CSS, and JavaScript. It combines Chromium and Node.js to create native applications.</p>
                
                <h3>Key Features</h3>
                <ul>
                    <li><strong>Cross-platform:</strong> Works on Windows, macOS, and Linux</li>
                    <li><strong>Web technologies:</strong> Use familiar HTML, CSS, and JavaScript</li>
                    <li><strong>Native APIs:</strong> Access operating system features</li>
                    <li><strong>Large ecosystem:</strong> Many popular apps built with Electron</li>
                </ul>
                
                <h3>Architecture</h3>
                <ul>
                    <li><strong>Main process:</strong> Manages the application lifecycle</li>
                    <li><strong>Renderer process:</strong> Handles the user interface</li>
                    <li><strong>IPC:</strong> Inter-process communication between main and renderer</li>
                </ul>
            </div>
        `,
        
        'chrome_extensions': `
            <div class="summary-section">
                <h2>🔌 Chrome Extensions - Browser Enhancement</h2>
                
                <h3>What are Chrome Extensions?</h3>
                <p>Chrome extensions are small software programs that customize and enhance the browsing experience. They can modify web pages, add functionality, and integrate with Chrome's features.</p>
                
                <h3>Key Components</h3>
                <ul>
                    <li><strong>Manifest:</strong> Configuration file that describes the extension</li>
                    <li><strong>Background scripts:</strong> Run in the background and handle events</li>
                    <li><strong>Content scripts:</strong> Interact with web pages</li>
                    <li><strong>Popup:</strong> User interface that appears when clicking the extension icon</li>
                </ul>
                
                <h3>Common Use Cases</h3>
                <ul>
                    <li><strong>Ad blocking:</strong> Remove unwanted advertisements</li>
                    <li><strong>Productivity:</strong> Enhance workflow and efficiency</li>
                    <li><strong>Web development:</strong> Debug and test web applications</li>
                    <li><strong>Content modification:</strong> Change how websites look and behave</li>
                </ul>
            </div>
        `
    };
    
    return summaries[topic] || '<div class="summary-section"><h2>Summary not available</h2><p>This topic summary is coming soon.</p></div>';
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('summaryDropdown');
    const button = document.querySelector('.dropdown-btn');
    
    if (!dropdown.contains(event.target) && !button.contains(event.target)) {
        dropdown.style.display = 'none';
    }
}); 