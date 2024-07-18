// Standalone components
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// Module
// import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
// import { AppModule } from "./app/app.module";

// platformBrowserDynamic().bootstrapModule(AppModule);

// This is the first file which is executed in the browser.
// It executes the function bootstrapApplication which takes a component and looks for it in the index.html
// After which it tries replacing the custom element present in the index.html with the markup of that component

// Here the AppComponent is passed which has the selector app-root 
// and now it identifies the tag and replaces it with app.component.html markup