#!/bin/bash

podman login docker.io
podman build . -t docker.io/p0wdergang3r/webappred:latest
podman push docker.io/p0wdergang3r/webappred:latest
