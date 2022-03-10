'use strict';

let rp = require('request-promise');
let _ = require('lodash');
let configJson = require('./config')

const token = configJson.token;
const backupDir = configJson.dir;

let Promise = require('bluebird')
let cmd = require('node-cmd')

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

rp.get('https://www.gitlab.com/api/v4/groups', {
  json: true,
  qs: {
    simple: true,
  },
  headers: {
    'PRIVATE-TOKEN': token
  }
}).then(groups => {
  let gids = _.map(groups, 'id')
  let pgits = [];
  let promises = [];
  for (let gid of gids) {
    promises.push(
      rp.get(`https://www.gitlab.com/api/v4/groups/${gid}/projects`, {
        json: true,
        headers: {
          'PRIVATE-TOKEN': token
        }
      }).then(projects => {
        var notmirrors = projects.filter(function (project) {
          return project.mirror === false;
        });
        let ps = _.map(notmirrors, 'ssh_url_to_repo')
        for (let p of ps) {
          pgits.push(p);
        }
      })
    )
  }
  Promise.all(promises).then(async () => {
    console.log(pgits);
    for (let git of pgits) {
      await sleep(3000)
      cmd.run(`git clone ${git} ${backupDir}/${git.substring(25, git.length - 4)}`);
    }
  });
})
