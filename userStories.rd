#### User Stories ####

## LOGIN:
As a user I should able to login securely.
As a new user I should be able to create an account.
Stretch:
As a user I should be able to signup through a trusted service (google facebook).
As a user of a financial service I should be able to signin using faceId.

### Path /login
### Path /signup
### Path /login/OAuth
### Path /login/FaceId
### Path /logout

## PROFILE:
As a user I should be able to create/edit my income.
As a user I should have a profile that displays past budgets / Username / Email / Profile Pic.
As a user I should have a clickable 3D coin that takes me to my profile.
Stretch:
As a user when I visit my profile page, I should see my active budget.

### Path /profile/new
### Path /profile/:id
### Path /profile/edit/:id
### Path /profile/delete/:id


## BUDGETS:
As a user I should have a visual display of how many budgets I've completed in a row (streak).
As a user I should be able to see when I have missed a budget, and by how much.
As a user I should be able to create/edit/delete new budget templates.
As a new user I should be able to access a few premade budget templates.
As a user I should be able to see how much I should be spending on a category based on generalized advice. 
Stretch:
As a user I should be able to share budget templates with other users.
As a user I should be able to have a friends list where we can see each others streaks.
As a user I should be able to decide what timeframe each budget is for. 
As a user I should receive text alerts that I am close/far from my monthly budget. 
As a user my budget should be displayed graphically.
As a user I should be able to see how much I should be spending on a category based on locaton.
As a user I should be able to add my spouse and seperate expenses. 

### Path /budgets
### Path /budgets/:id
### Path /budgets/create
### Path /budgets/edit/:id
### Path /budgets/delete/:id
### Path /budgets/share/:id

## GOALS:
As a user I should be able to set savings goals.
As a user I should be able to set a housing goal.
As a user I should be able to set a new car goal.
Stretch:
As a user I should be able to set expense reduction goals.
As a user I should be able to set increase income goals.

### Path /goals
### Path /goals/create
### Path /goals/edit
### Path /goals/delete

## EXPENSES:
As a user I should be able to add/edit/delete expenses.
As a user I should be able to add/edit/delete fixed expenses (Frequency).
As a user I should be able to see all expenses and total costs.
As a user I should ablt to see specific expenses.
As a user I should be able to order expenses by category/date.
As a user I should be able to order fixed by category/date.
As a user I should be ablt to see specific categories of expenses.
As a user I should be able to manage payments for expenses. (Link to expense payment, actually pay the bill?)


### Path /expenses
### Path /expenses/:id
### Path /expenses/new
### Path /expenses/edit/:id
### Path /expenses/delete/:id

## CATEGORIES:
As a user I should be able to create/edit/delete categories.
As a user I should be able to total costs of categories.
As a user I should be able to select from assorted premade categories.
As a user I should be able to see all expenses by categories.

### Path /categories
### Path /categories/:id
### Path /categories/new
### Path /categories/edit/:id
### Path /categories/delete/:id
### Path /categories/:id/expenses



