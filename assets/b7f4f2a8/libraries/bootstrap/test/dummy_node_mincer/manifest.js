"use strict";var Mincer=require("mincer");Mincer.logger.use(console);var environment=new Mincer.Environment(process.cwd()),bootstrapPath="../../";environment.appendPath(bootstrapPath+"assets/stylesheets"),environment.appendPath(bootstrapPath+"assets/fonts"),environment.appendPath("./"),environment.ContextClass.defineAssetPath((function(e,n){var t=this.environment.findAsset(e,n);if(!t)throw new Error("File "+e+" not found");return"/assets/"+t.digestPath}));var manifest_path=process.argv[2]||__dirname+"/assets",manifest=new Mincer.Manifest(environment,manifest_path);manifest.compile(["application.css"],(function(e,n){e&&(console.error("Failed compile assets: "+(e.message||e.toString())),process.exit(128)),console.info("\n\nAssets were successfully compiled.\nManifest data (a proper JSON) was written to:\n"+manifest.path+"\n\n"),console.dir(n)}));