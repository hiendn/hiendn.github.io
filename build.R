required_packages <- c("rmarkdown", "bibtex")
missing_packages <- required_packages[!vapply(required_packages, requireNamespace, logical(1), quietly = TRUE)]
if (length(missing_packages)) {
  stop("Install the required R packages: ", paste(missing_packages, collapse = ", "))
}

# RStudio includes Pandoc, even when it is not on the command-line PATH.
if (rmarkdown::find_pandoc()$version == "0") {
  candidates <- c(
    "/Applications/RStudio.app/Contents/Resources/app/quarto/bin/tools/aarch64",
    "/Applications/RStudio.app/Contents/Resources/app/quarto/bin/tools/x86_64"
  )
  candidates <- candidates[file.exists(file.path(candidates, "pandoc"))]
  if (length(candidates)) Sys.setenv(RSTUDIO_PANDOC = candidates[[1]])
}
if (rmarkdown::find_pandoc(cache = FALSE)$version == "0") {
  stop("Pandoc is required. Install RStudio or set RSTUDIO_PANDOC to its directory.")
}

Sys.setenv(TZ = "Australia/Melbourne")
bib_files <- c(rmarkdown::yaml_front_matter("index.Rmd")$bibliography,
               "Untitled_files/preprints.bib")
bib_keys <- unlist(lapply(bib_files, function(path) names(bibtex::read.bib(path))), use.names = FALSE)
duplicate_keys <- unique(bib_keys[duplicated(bib_keys)])
if (length(duplicate_keys)) {
  stop("Bibliography keys must be unique so works are not omitted: ",
       paste(duplicate_keys, collapse = ", "))
}
rmarkdown::render("index.Rmd", quiet = FALSE)
