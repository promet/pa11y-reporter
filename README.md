# Promet Pa11y Reporter

Our customized HTML reporter

![alt screenshot](https://www.evernote.com/l/AOu9Nx5FyDVHR7JLPekIz6peghFedZwuwWkB/image.png)

## Installing

* Download as Zip File
* Locate your Pa11y core folder - for now (TODO - move as module? )
* Example to locate: `which pa11y` - this will give you the shortcut link, you need to execute `ls -l` the original location.
* Extract the files under reporter folder (/usr/local/lib/node_modules/pa11y/reporter) - maybe you have different location.
* Final path should be like `/usr/local/lib/node_modules/pa11y/reporter/promet_reporter`.

```
pa11y -r promet_reporter URL > FILENAME.html
```

Using pa11y-sitemap (requires to update the current python script for the new changes)

```
python pa11y-sitemap.py -r promet_reporter ...options
```
