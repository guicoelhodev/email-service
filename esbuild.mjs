import esbuild from "esbuild";

esbuild
	.build({
		entryPoints: ["./src/server.ts", "./src/worker.ts"],
		bundle: true,
		platform: "node",
		target: "node20",
		outdir: "./build",
		sourcemap: true,
		alias: {
			"@": "./src",
		},
		external: ['dotenv'],
	})
	.catch(() => process.exit(1));
