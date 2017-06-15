# Promet Pa11y Reporter

Our customized HTML reporter

![alt screenshot](https://www.evernote.com/l/AOu9Nx5FyDVHR7JLPekIz6peghFedZwuwWkB/image.png)

## Installing

* Download as Zip File
* Locate your Pa11y core folder - for now (TODO - move as module? )
* Example to locate: `which pa11y`
* Extract the files under reporter folder (/usr/local/lib/node_modules/pa11y/repoter) - maybe you have different location.

```
pa11y -r promet_reporter URL > FILENAME.html
```

Using pa11y-sitemap (requires to update the current python script for the new changes)

```
python pa11y-sitemap.py -r promet_reporter ...options
```
