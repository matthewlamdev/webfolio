import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';

// Initialize Octokit with GitHub token
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function POST(request: Request) {
  try {
    const { repo, workflowId } = await request.json();

    if (!repo || !workflowId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Split repo into owner and repo name
    const [owner, repoName] = repo.split('/');

    // Trigger the workflow
    const response = await octokit.actions.createWorkflowDispatch({
      owner,
      repo: repoName,
      workflow_id: workflowId,
      ref: 'main', // or your default branch
    });

    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Error triggering workflow:', error);
    return NextResponse.json(
      { error: 'Failed to trigger workflow' },
      { status: 500 }
    );
  }
} 