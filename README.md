# (code name) project-sophia
a minimalist, open-platform reference and knowledge manager for humanities

## Primary objectives
- minimalist, with dark mode
- tailored to the needs of scholars in humanities
- tag-centric
- compatible with markdown and pandoc 
- run locally, cross-platform
- other features missing from Zotero/Mendeley etc
  - link chapter entries to book entry (for books with chapters written by differnt authors)
  - open platform, easy for users to move files, edit notes, etc. outside of the app
  - alert duplicates immediately
  - multiple publishers
  - automatic short titles
- (stretch goal) implement an importer extension

## How is my project different from, say, Zotero?
- Modern, cross-platform, responsible interface thanks to Electron
- JSON + file storage, instead of the traditional SQL + database storage

# Third party software used
- Built on Electron. Written in Visual Studio.
- Icon packs: [vscode-codicons](https://github.com/microsoft/vscode-codicons) and [remixicon](https://github.com/Remix-Design/remixicon)
- Schemas: [CSL JSON](https://github.com/citation-style-language/schema/blob/master/schemas/input/csl-citation.json)