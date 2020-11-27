# COMP426 final project

# Structure

The index.html and its script and style sheet are all for the signin page, which is the first page that loads. All other pages are in their own folders (like the sign up page is in the signUp folder.)

## To clone the repositorie:

1. copy the HTTPS address.
2. Open VScode, click on View, command palette
3. type in git:clone and hit enter. Then copy the HTTPS address into the text bar and hit enter.
4. click on open or open in new window.

## To clone the repositorie:

1. copy the HTTPS address.
2. Open VScode, click on View, command palette
3. type in git:clone and hit enter. Then copy the HTTPS address into the text bar and hit enter.
4. click on open or open in new window.
5. Open terminal and run npm install.
6. You should now be able to run: npm start. This will run the code and open the web window in your browser.

## To commit the repositorie

1. save all files.
2. open terminal and type in the following commands:
3. git add . (with the .)
4. git commit -m "PUT SOME MESSAGE HERE."
5. Now your code have been commited.
6. Note: Commit does not mean push the repositorie to github. It simply creates a new git "frame". This frame stores a snapshot of the current saved folder and all the files in it. Beware that only rebase will change the history timeline of git commits.

## To push the repositorie to github

1. Make sure you saved all your files and commited before doing the following.
2. Open terminal if not already opened.
3. Type in: git push.
4. You may need to login to github, if you need to, the window will pop up.
5. If there is a newer version of the current branch you worked on on github, you might run into some conflects. You will need to follow the command prompt suggested (I remember it was like git push origin something something). And you will need to manually change files that caused the conflict. Google it if needed.

## To pull the repositorie from github:

1. Make sure to do this before you start working or all work will be gone.
2. open terminal and type: git pull.
3. If your current repositorie is up to date, the terminal will tell you. Else, it will pull the latest version of codes from github.

## To creat a new branch:

1. Open terminal
2. type in: git checkout -b branchName.
3. Now you should be switched to the new branch.
4. You can type in: git checkout main(or other branch name) to get to other branches. However, save all files, commit them before switching.

## To check the branches:

1. In your terminal, type in: git branch --all
2. This will show all the local branches as well as which branch you are currently working on. It will be indecated using \* sign.

## To merge branches:

1. There are two types of merges, one is the fast-forward merge and the other that is not. In our situation, we will be using the not fast-forward merge.
2. In terminal, make sure you are at the main branch (or the branch you want the new git commit to be at).
3. Type in: git merge --no-ff branchName.
4. Commit and then do what ever you need.
5. Note: The none-fastforward merge does not "destroy" the branch being merged.

## To delete a branch:

1. Before deleting a branch, make sure to merge the branch first. Unless this new code in this branch is no longer needed.
2. To delete a branch locally, in the terminal type in: git branch -d branchName.
3. To delete a branch in the remoterepository, in ther terminal type in: git push origin --delete branchName.
4. Note: Deleting a branch locally does not mean the branch is also deleted remotely. In our case, we will need to delete a branch remotely everytime since this is a remote repository.

## To rebase a branch:

1. This is used when the master branch is updated and the other branch are behind in versions. So should be run locally everytime when the master/main brach is changed.
2. In the the terminal (and in the branch that needs an update), type: git rebase branchName(most likely main)
3. push to github, there is not need for git add . or git commit
