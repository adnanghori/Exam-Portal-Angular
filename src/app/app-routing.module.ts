import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuizQuestionComponent } from './pages/admin/view-quiz-question/view-quiz-question.component';
import { ViewQuizesComponent } from './pages/admin/view-quizes/view-quizes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { InstructionComponent } from './pages/normal/instruction/instruction.component';
import { LoadQuizComponent } from './pages/normal/load-quiz/load-quiz.component';
import { StartQuizComponent } from './pages/normal/start-quiz/start-quiz.component';
import { UpdateUserProfileComponent } from './pages/normal/update-user-profile/update-user-profile.component';
import { UserDashboardComponent } from './pages/normal/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './pages/normal/user-profile/user-profile.component';
import { UserWelcomeComponent } from './pages/normal/user-welcome/user-welcome.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {RegisterComponent} from './pages/register/register.component'
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [
  
  {
    path:'register',
    component: RegisterComponent,
    pathMatch:'full'
  },
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
  },
  {
    path:'login',
    component:LogInComponent,
    pathMatch:'full'
  }, 
  {
    path : 'admin',
    component : DashboardComponent,
    canActivate:[AdminGuard],
    children:[
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'',
        component:WelcomeComponent
      },
      {
        path:'categories',
        component:ViewCategoriesComponent,
      },
      {
        path:'add-categories',
        component:AddCategoryComponent
      },
      {
        path:'quizes',
        component:ViewQuizesComponent
      },
      {
        path:'add-quiz',
        component:AddQuizComponent
      },
      {
        path:'update-quiz/:qid',
        component:UpdateQuizComponent
      },
      {
        path:'view-quiz-question/:qid',
        component:ViewQuizQuestionComponent
      },
      {
        path:'add-question/:qid',
        component:AddQuestionComponent
      },
      {
        path:'update-question/:quizTitle/:questionId',
        component:UpdateQuestionComponent
      }
      
    ]
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    canActivate:[NormalGuard],
    children:[
      {
        path:'',
        component:UserWelcomeComponent
      },
      {
        path:'load-quiz',
        component:LoadQuizComponent
      },
      {
        path:'load-quiz/:cid',
        component:LoadQuizComponent,
      },
      {
        path:'instruction/:qid',
        component:InstructionComponent
      },
      {
        path:'profile',
        component:UserProfileComponent
      },
      {
        path:'profile/update',
        component:UpdateUserProfileComponent
      }
      
    ]
  },
  
  {
    path:'start-quiz/:qid',
    component:StartQuizComponent,
    canActivate:[NormalGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
