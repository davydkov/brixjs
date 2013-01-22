define([
    'places/ProfilePlace',
<<<<<<< HEAD
    'places/SettingsPlace',
    'places/SubSettingsPlace'
], function (ProfilePlace, SettingsPlace, SubSettingsPlace) {
    // This module just returns mapping of places to its string tokens
=======
    'places/SettingsPlace'
], function (ProfilePlace, SettingsPlace) {
    // This module just returns mapping of places to string tokens
>>>>>>> edit documentation language
    return {
        '': ProfilePlace, // Default Place
        'profile': ProfilePlace,
        'settings': SettingsPlace,
        'sub-settings': SubSettingsPlace
    };
});