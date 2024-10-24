Frontend for https://github.com/spewwerrier/janki. Expects janki to be running in port 8080 (check config.ts)
```sh
bun run dev
```

# Todo
- Make deletable knob properties, currently it is append only due to limitation in server which uses array type in postgres
- PDF export of knobs using typst, which is again plans in server side
- View other user information and knobs
