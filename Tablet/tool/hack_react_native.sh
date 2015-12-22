#!/bin/bash
pushd ./node_modules/react-native/packager/
awk 'NR==13{print "source ~/.bash_profile"}1' react-native-xcode.sh > react-native-xcode.sh_tmp
mv react-native-xcode.sh_tmp react-native-xcode.sh
chmod +x react-native-xcode.sh
popd