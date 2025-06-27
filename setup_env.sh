#!/bin/bash

# Setup backend environment
cd server
cp .env.example .env

# Go back and setup frontend environment
cd ../client
cp .env.example .env

echo "Environment files copied for both server and client."
