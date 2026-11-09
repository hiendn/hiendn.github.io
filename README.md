# Hien Duy Nguyen's website

The site is published at https://hiendn.github.io/ from `index.html`.

## Updating the site

Edit the biography, roles, projects and revision date in `index.Rmd`. Update the
four existing bibliography files in `Untitled_files/` for published works and
other contributions. Public preprints have a separate bibliography,
`Untitled_files/preprints.bib`, so their status stays explicit.

Preprints require a verified first-submission `date` in ISO format,
`YYYY-MM-DD`. The build displays only works first posted within the previous
two years, ordered by that date. A later arXiv revision does not reset the age.

The current public CV download is `assets/Hien_Nguyen_CV.pdf`.
The presentation styles and publication search live in
`Untitled_files/site.css` and `Untitled_files/site.js`. The default dark theme
has an optional light theme. Publication filters run entirely in the visitor's
browser.

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
