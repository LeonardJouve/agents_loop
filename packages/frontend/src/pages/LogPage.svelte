<script lang="ts">
  import logSource from '@decorator-playground/decorators-legacy/src/log.ts?raw';

  let status = $state<number | null>(null);
  let body = $state<string>('');
  let loading = $state(false);
  let error = $state<string | null>(null);

  async function callBooks() {
    loading = true;
    error = null;
    status = null;
    body = '';

    try {
      const res = await fetch('/api/books');
      status = res.status;
      const data = await res.json();
      body = JSON.stringify(data, null, 2);
    } catch (err) {
      error = err instanceof Error ? err.message : String(err);
    } finally {
      loading = false;
    }
  }
</script>

<main>
  <h1>@Log — Legacy Decorator</h1>

  <section class="source">
    <h2>Source</h2>
    <pre><code>{logSource}</code></pre>
  </section>

  <section class="playground">
    <h2>Live API Call</h2>
    <button onclick={callBooks} disabled={loading}>
      {loading ? 'Loading…' : 'GET /api/books'}
    </button>

    {#if error}
      <div class="inspector error">
        <strong>Error:</strong> {error}
      </div>
    {/if}

    {#if status !== null}
      <div class="inspector">
        <div><strong>Status:</strong> {status}</div>
        <pre><code>{body}</code></pre>
      </div>
    {/if}
  </section>
</main>

<style>
  main {
    font-family: system-ui, sans-serif;
    max-width: 960px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    margin-bottom: 1.5rem;
  }

  section {
    margin-bottom: 2rem;
  }

  pre {
    background: #f5f5f5;
    border-radius: 0.5rem;
    padding: 1rem;
    overflow-x: auto;
  }

  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.9rem;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .inspector {
    margin-top: 1rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    background: #fafafa;
  }

  .error {
    color: #c00;
    background: #fee;
    border-color: #fcc;
  }
</style>
