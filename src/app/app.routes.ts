import { Routes } from '@angular/router';
import { PersonalBlogComponent } from './personal-blog/personal-blog.component';
import { ResumeComponent } from './resume/resume.component';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

export const routes: Routes = [
  {
    path: 'souro',
    component: HomeComponent,
  },
  {
    path: 'souro/journey',
    component: PersonalBlogComponent,
  },
  { path: 'souro/resume', component: ResumeComponent },
  { path: 'souro/projects', component: PortfolioComponent },
  { path: 'souro/contact-me', component: ContactFormComponent },
  {
    path: '',
    redirectTo: '/souro',
    pathMatch: 'full',
  },
];
