import { Panel } from "./Panel";
import { Mono } from "./Mono";
import { StatusDot } from "./StatusDot";

const SAMPLE_YAML = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: watchparty-api
  labels: { app: watchparty, tier: api }
spec:
  replicas: 3
  selector:
    matchLabels: { app: watchparty, tier: api }
  template:
    metadata:
      labels: { app: watchparty, tier: api }
    spec:
      containers:
        - name: api
          image: ghcr.io/akash-aman/watchparty-api:1.4.2
          ports: [{ containerPort: 8080 }]
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef: { name: pg-creds, key: url }
          readinessProbe:
            httpGet: { path: /healthz, port: 8080 }
          resources:
            requests: { cpu: "100m", memory: "128Mi" }
            limits:   { cpu: "500m", memory: "512Mi" }
---
apiVersion: v1
kind: Service
metadata: { name: watchparty-api }
spec:
  selector: { app: watchparty, tier: api }
  ports: [{ port: 80, targetPort: 8080 }]
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: watchparty-api
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt
spec:
  tls: [{ hosts: [api.watchparty.xcode.cx], secretName: wp-tls }]
  rules:
    - host: api.watchparty.xcode.cx
      http:
        paths:
          - { path: /, pathType: Prefix, backend: { service: { name: watchparty-api, port: { number: 80 } } } }`;

export function K8sPanel() {
    return (
        <Panel
            header="Kubernetes Readiness"
            eyebrow="capability · lab"
            right={<span className="infra-pill infra-pill--amber text-[0.6rem]">migration-ready</span>}
        >
            <div className="grid lg:grid-cols-[1fr_220px] gap-4">
                <div>
                    <p className="m-0 text-xs opacity-70 mb-2">
                        Production runs as Docker Compose on a single VPS — cost-optimized,
                        zero noisy-neighbor risk, ops control via NPM + Watchtower. The same
                        services map cleanly onto K8s; manifests live in
                        {" "}<Mono className="text-[0.7rem] opacity-90">infra.xcode.cx/k8s/</Mono>{" "}
                        for a future fleet.
                    </p>
                    <pre className="mono text-[0.7rem] leading-relaxed overflow-auto max-h-72 p-3 rounded-md border border-(--infra-border) bg-(--bg-overlay-dark)">
                        <code>{SAMPLE_YAML}</code>
                    </pre>
                </div>

                {/* Tiny cluster visual */}
                <div className="grid gap-2 content-start">
                    <Mono className="eyebrow">cluster · 3 nodes</Mono>
                    <NodeBox label="control-plane" pods={["api-server", "etcd", "scheduler"]} tone="purple" />
                    <NodeBox label="worker-01" pods={["wp-api×2", "wp-wss×1", "auth-idp×1"]} tone="green" />
                    <NodeBox label="worker-02" pods={["wp-api×1", "obs-prom×1", "redis×1"]} tone="green" />
                </div>
            </div>
        </Panel>
    );
}

function NodeBox({ label, pods, tone }: { label: string; pods: string[]; tone: "green" | "purple" }) {
    return (
        <div className="border border-(--infra-border) rounded-md p-2.5">
            <div className="flex items-center gap-2 mb-1.5">
                <StatusDot tone={tone} />
                <Mono className="text-[0.7rem]">{label}</Mono>
            </div>
            <div className="flex flex-wrap gap-1">
                {pods.map((p) => (
                    <span key={p} className="infra-pill text-[0.6rem]">{p}</span>
                ))}
            </div>
        </div>
    );
}
