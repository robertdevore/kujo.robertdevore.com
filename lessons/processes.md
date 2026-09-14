## What can this code touch?

Process execution can invoke another program with the current user's privileges. A Kujo capability gate controls access to that native surface; it does not automatically restrict everything the child executable can do.

## Native contract

spawn_process accepts an argv array and returns a ProcessResult struct. Inspect exitcode, stdout, stderr, success, timed_out, cancelled, and output truncation flags. Options bound timeout and captured output, and can control inherited environment and working directory.

execute_status uses a shell string and requires separate shell-exec authority. Prefer argv when you do not need shell syntax. This keeps spaces and punctuation inside an argument from becoming shell operators. It does not prevent a dangerous argument from being interpreted by the chosen executable itself.

The example invokes /usr/bin/printf with a fixed format and string on macOS/Linux. This is a platform-specific native integration drill. In your own program, select an operator-approved executable rather than accepting an arbitrary model-proposed program name.

## Machine receipt

ProcessResult is a struct, not directly a JSON dictionary. Copy the fields your caller needs. Refuse to treat truncated output as a complete artifact. A timeout or cancellation forces success false, but your application still needs a cleanup and retry policy.

## Professional pattern

Use a fixed executable, validated arguments, a small environment, finite timeout, and bounded output. Redact sensitive values at the process capture boundary. A child process with broad credentials can leak them regardless of whether the parent prints a Secret wrapper safely.

## Common mistakes

Do not use shell quoting as your only command policy. Do not infer success from stdout text while ignoring exit status. Do not grant shell-exec just to avoid assembling an argv array. The stage build uses a controlled process and serializes only selected fields.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.4.0 runtime.

{{command}}

{{output}}

## Break it and diagnose it

The argv array is empty. The runtime must reject the invalid arguments before starting a child process.

{{broken}}

{{diagnostic}}

## Exercise

Replace printf with an explicitly configured equivalent on your operating system. Test a nonzero exit and a bounded timeout. Produce a dictionary receipt that rejects truncation and never includes inherited secrets.

## Checkpoint

- I use argv for direct process calls.
- I inspect status and truncation.
- I understand child-process authority.


## Process replacement and POSIX tooling

Kujo 1.4.0 adds `exec_process(argv, options)` for POSIX command launchers. Unlike `spawn_process`, successful replacement does not return a ProcessResult: the new program inherits terminal streams and working directory. Explicit argv avoids shell parsing but does not limit the executable's authority. The operation requires process-exec.

Related `file_lock`, `file_unlock`, `path_owned`, and `symlink_atomic` APIs support package installation. Advisory locks coordinate cooperating processes; they cannot stop a malicious same-user writer. Atomic symlink publication requires a trusted parent and both write/delete authority. These POSIX APIs fail explicitly on unsupported platforms, including Windows; they do not emulate unsafe shell operations. Review the [native security contract](https://github.com/kujolang/kujo/blob/v1.4.0/docs/NATIVE_API_SECURITY_POSTURE.md) before using them.
