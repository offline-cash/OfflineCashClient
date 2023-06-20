#!/bin/bash

cd ..

OUT=$(patch --forward --dry-run < ios/patches/WebSocketCertPinning.patch)

if [ $? -eq 0 ]
then
	patch --forward < ios/patches/WebSocketCertPinning.patch

	if [ $? -ne 0 ]
	then
		echo "Failed to apply patches"
		exit 1
	fi
else
	echo "$OUT" | grep -q "previously applied"

	if [ $? -eq 0 ]
	then
		echo "Patches already applied"
		exit 0
	else
		echo "Failed to apply patches"
		exit 1
	fi
fi
