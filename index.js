const github = require('@actions/github');
const core = require('@actions/core');

const authToken = core.getInput('token', {required: true});
const octokit = github.getOctokit(authToken);
const context = github.context;

const { owner, repo } = context.repo;
const sha = context.sha;
const branch = core.getInput('target-branch', {required: true});
const force = (core.getInput('force') || 'false').toUpperCase() === 'TRUE'

octokit.git.updateRef({owner, repo, ref: `heads/${branch}`, sha, force}).
  catch(error => {
    core.setFailed(`Failed to update ref: ${error}`);
  });
