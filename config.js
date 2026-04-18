document.addEventListener('DOMContentLoaded', () => {
    const toggleExtension = document.getElementById('toggleExtension');
    const profileInput = document.getElementById('profileInput');
    const addButton = document.getElementById('addButton');
    const profileList = document.getElementById('profileList');

    chrome.storage.local.get({ isActive: true, blockedProfiles: [] }, (data) => {
        toggleExtension.checked = data.isActive;
        renderList(data.blockedProfiles);
    });

    toggleExtension.addEventListener('change', () => {
        chrome.storage.local.set({ isActive: toggleExtension.checked });
    });

    addButton.addEventListener('click', () => {
        let rawInput = profileInput.value.trim();
        if (!rawInput) return;

        let itemsToAdd = [];

        // Erkennt eingefügte Bild-Links von Twitter und filtert die ID heraus
        if (rawInput.includes('twimg.com/profile_images')) {
            const match = rawInput.match(/profile_images\/(\d+)\//);
            if (match && match[1]) {
                itemsToAdd.push(match[1]);
            }
        } 
        // Erkennt, falls du direkt nur die ID-Nummer eintippst
        else if (/^\d+$/.test(rawInput)) {
            itemsToAdd.push(rawInput);
        }
        // Behandelt normale Account-Namen (@skinscom)
        else {
            let profile = rawInput.toLowerCase();
            if (profile.startsWith('@')) {
                profile = profile.substring(1);
            }
            itemsToAdd.push(profile);
        }

        if (itemsToAdd.length > 0) {
            chrome.storage.local.get({ blockedProfiles: [] }, (data) => {
                let profiles = data.blockedProfiles;
                let updated = false;

                itemsToAdd.forEach(item => {
                    if (!profiles.includes(item)) {
                        profiles.push(item);
                        updated = true;
                    }
                });

                if (updated) {
                    chrome.storage.local.set({ blockedProfiles: profiles }, () => {
                        renderList(profiles);
                        profileInput.value = '';
                    });
                } else {
                    profileInput.value = '';
                }
            });
        }
    });

    function renderList(profiles) {
        profileList.innerHTML = '';
        profiles.forEach((profile) => {
            const li = document.createElement('li');
            li.textContent = isNaN(profile) ? '@' + profile : 'ID: ' + profile; 
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'X';
            deleteBtn.className = 'delete-btn';
            deleteBtn.onclick = () => removeProfile(profile);
            
            li.appendChild(deleteBtn);
            profileList.appendChild(li);
        });
    }

    function removeProfile(profileToRemove) {
        chrome.storage.local.get({ blockedProfiles: [] }, (data) => {
            const profiles = data.blockedProfiles.filter(p => p !== profileToRemove);
            chrome.storage.local.set({ blockedProfiles: profiles }, () => {
                renderList(profiles);
            });
        });
    }
});