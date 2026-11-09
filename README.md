# Hien Duy Nguyen's website

The site is published at https://hiendn.github.io/ from `index.html`.

## Updating the site

Edit the biography, roles, projects and revision date in `index.Rmd`. Update the
four existing bibliography files in `Untitled_files/` for published works and
other contributions. Public preprints have a separate bibliography,
`Untitled_files/preprints.bib`, so their status stays explicit.

The CV link points to the existing public `Master_CV.pdf` in the separate
`hiendn/CV` repository.

The build uses the files saved in this repository. It does not download or
overwrite the portrait, bibliography files or citation style.

## Building and checking

Install R, Pandoc and the R packages `rmarkdown` and `bibtex`. RStudio includes
Pandoc; `build.R` also checks its standard macOS installation paths.

From the repository directory, run:

```sh
Rscript build.R
```

Review the rebuilt `index.html`, test the navigation and CV download, and check
the page at desktop and phone widths. Commit both the editable sources and the
rebuilt HTML. GitHub Pages publishes the files on the `master` branch.
