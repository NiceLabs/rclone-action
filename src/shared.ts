import { getInput } from '@actions/core';
import { getOctokit } from '@actions/github';
import { context } from '@actions/github/lib/utils';
import { seal } from 'tweetsodium';

export const github = getOctokit(getInput('github-token', { required: true }));

export const setRepoSecret = async (name: string, value: string) => {
  const { data } = await github.actions.getRepoPublicKey(context.repo);
  const encryptedValue = seal(
    Buffer.from(value),
    Buffer.from(data.key, 'base64')
  );
  await github.actions.createOrUpdateRepoSecret({
    ...context.repo,
    secret_name: name,
    key_id: data.key_id,
    encrypted_value: Buffer.from(encryptedValue).toString('base64'),
  });
};
