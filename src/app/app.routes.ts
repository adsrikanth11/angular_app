import { Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';
import { PagenotfoundComponent } from './feature/pagenotfound/pagenotfound.component';

export const routes: Routes = [
   { path: '', component: HomeComponent },
   { path: '**', component: PagenotfoundComponent }
];
