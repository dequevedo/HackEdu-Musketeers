import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule }    from '@angular/http'
import { Md5 } from 'ts-md5'; 

import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File} from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransferObject, FileTransfer } from '@ionic-native/file-transfer/ngx'
import { Downloader } from '@ionic-native/downloader/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import { EmailComposer } from '@ionic-native/email-composer/ngx';  



import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';


import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage'
import { from } from 'rxjs';


//firebase.initializeApp(environment.firebase);


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileChooser,
    File,
    FilePath,
    FileTransfer,
    FileTransferObject,
    AndroidPermissions,
    Downloader,
    EmailComposer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Md5
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
