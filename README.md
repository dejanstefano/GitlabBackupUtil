# GitlabBackupUtil

### Shamelessly stolen and modified from https://github.com/itsTeknas/GitlabBackupUtil - Thanks!

A Small utility to backup all of your gitlab repositories to local filesystem.

__This is only clone repos that aren't mirrored from another SCM__

Before running the script, make sure you have persisted authentication on local cli with gitlab.

This specifically works for Slicelife repos.  It would need to be modified to work for other institutions.

Create a file named `config.json` with the structure
```javascript
{
    "token" : "YOUR_GITLAB_TOKEN",
    "dir" : "Absolute path to backup dir"
}

```

place the file in the root directory of the project.

run the following commands
```javascript
npm install
npm start
```

### Thats It :rocket:, Now go backup
