import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { StudentDashboardComponent } from './pages/student/student-dashboard/student-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { StudentGuard } from './services/student.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { LoadQuizComponent } from './pages/student/load-quiz/load-quiz.component';
import { PrequizComponent } from './pages/student/prequiz/prequiz.component';
import { StartComponent } from './pages/student/start/start.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },

  {
    path: 'admin',
    component: DashboardComponent,
    // pathMatch: 'full',
    canActivate: [AdminGuard], //Without Admin no one can enter this site
    children: [
      {
        path: '',
        component: WelcomeComponent,
      },

      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'categories',
        component: ViewCategoriesComponent,
      },

      {
        path: 'add-category',
        component: AddCategoryComponent,
      },

      {
        path: 'quizzes',
        component: ViewQuizzesComponent,
      },

      {
        path: 'add-quiz',
        component: AddQuizComponent,
      },

      {
        path: 'quiz/:qid',
        component: UpdateQuizComponent,
      },

      {
        path: 'view-questions/:qid/:title',
        component: ViewQuizQuestionsComponent,
      },

      {
        path: 'add-question/:qid/:title',
        component: AddQuestionComponent,
      },

    ],
  },

  {
    path: 'student-dashboard',
    component: StudentDashboardComponent,
    // pathMatch: 'full',
    canActivate: [StudentGuard],
    children:[

      {
        path: ':catId',
        component: LoadQuizComponent,
      },

      {
        path: 'prequiz/:qid',
        component: PrequizComponent,
      },
      // {
      //   path: 'profile',
      //   component: ProfileComponent,
      // },



    ]
  },

  // not in student or admin
  {
    path: 'start/:qid',
    component: StartComponent,
    canActivate: [StudentGuard],
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
