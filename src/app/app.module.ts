import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PostsComponent } from './routes/posts/posts/posts.component';
import { HomeComponent } from './routes/home/home/home.component';

@NgModule({
	declarations: [AppComponent, PostsComponent, HomeComponent],
	imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule, MatButtonModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
