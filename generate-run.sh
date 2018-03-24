#!/bin/sh
cat > run.sh << 'EOF'
node server.js
EOF
chmod +x run.sh