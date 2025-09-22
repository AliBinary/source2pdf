# source2pdf

Auto generate a PDF notebook from your source codes (useful for your ACM-ICPC cheatsheet)

## Dependencies

This generator works in both Linux and Windows, so check how to install TeX Live in your OS.

TeX Live for linux:

    aptitude install texlive

TeX Live for Windows:

    download installer (install-tl-windows.exe) from https://www.tug.org/texlive/acquire-netinstall.html

## Install

    npm install -g source2pdf

## Use

    Usage: source2pdf <soruce_dir> [options]

    Auto generate a PDF notebook from your source codes

    Options:

        -V, --version             output the version number
        -a --author [name]        author's name to be added in the notebook
        -i --initials [initials]  initials of the author to be placed in the upper-right corner of all pages
        -o --output [filename]    output file for the notebook. Default to `./notebook.pdf`
        -h, --help                output usage information

example:

    source2pdf ./ /tmp/team_reference.pdf
    source2pdf ./ --author "Shahid Beheshti University" --initials SBU

The second one will create a 'notebook.pdf' file in the current directory.

## Example PDF

Here you can find an example: https://github.com/pin3da/Programming-contest/blob/master/codes/notebook.pdf
(The example file has two columns in each page but in the forked version, the generated notebook file will have three columns in each page; so you can put more source codes in a few number of pages.)

## Files

The notebook generator will add your source code with syntax highlight, additionally
you can add .tex files which will be rendered as latex code.

## Notes:

- Try to use up to 3 "levels" in your source code.
- Use spaces insead of underscore (in the filenames) to print a prettier TOC.
- In the forked version of the repository, the generated notebook will have three columns in each page.
