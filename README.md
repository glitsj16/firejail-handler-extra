# Extra URL handlers for Firejail

[Firejail](https://github.com/netblue30/firejail) is a SUID sandbox program that reduces the risk of security breaches by restricting the running environment of untrusted applications using Linux namespaces, seccomp-bpf
and Linux capabilities. It allows a process and all its descendants to have their own private view of the globally shared kernel resources, such as the network stack, process table, mount table. Firejail can work in a SELinux or AppArmor environment, and it is integrated with Linux Control Groups.

When using Firejail's desktop integration features, all supported applications will run fully sandboxed. Opening hyperlinks from within another sandboxed application can become tedious. Until this functionality is natively supported, it is recommended to copy-paste hyperlinks from sandbox to sandbox (see e.g.  [#2228](https://github.com/netblue30/firejail/issues/2228) and [#2047](https://github.com/netblue30/firejail/issues/2047)). Work is underway to implement this via the newly introduced [D-Bus filtering](https://github.com/netblue30/firejail/issues/3471#issuecomment-646582480), but that's not in any firejail release yet.

The scripts in this repository implement a more user-friendly - still fully secure - way to relay certain traffic between firejailed applications. There is no D-Bus functionality involved, so the current profiles should work. The basic idea is to pass hyperlink data between sandboxes indirectly. Relying on a simple shell script, a URL is temporarily stored in the filesystem in a pre-determined location (which needs read-write access in the originating profile). A companion shell script uses `inotifywait` to pick up the URL from outside the sandbox and relays it to a fully firejailed handler application of choice.

## What is supported?

Only 2 extra handlers are available:

- a `BitTorrent` handler that relays URL's from inside a sandboxed web browser to a configurable, fully sandboxed bittorrent application (defaults to local transmission-daemon)
- a `Youtube` handler that relays URL's from inside a sandboxed web browser to a configurable, fully sandboxed media player (defaults to mpv)

Both can be installed seperately, and the common settings file needs to be installed only once.
There are no plans to support other firejail handlers in this repository. As such it is more a Proof-Of-Concept than a fully developed application. The rationale is quite simple, so users can copy/paste the scripts and edit them for a specific use-case.

For the `Youtube` handler your web browser will need an add-on like [Greasemonkey](https://github.com/greasemonkey/greasemonkey), [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/), plus a user.js script to rewrite URL's on-the-fly into the supported _fjyt_ protocol. An example `fjyt.user.js` is supplied, but might need additional editing.

## Installing

Arch Linux users can install from the AUR: [firejail-handler-extra](https://aur.archlinux.org/packages/firejail-handler-extra/).

On other distributions you'll need the following dependencies:

	* firejail
	* inotify-tools
	* xdg-utils

	* a firejail supported bittorrent application
	* a firejail supported media player
	* a firejail supported web browser

Clone the source code from the Git repository and install manually:

`````
$ git clone https://github.com/glitsj16/firejail-handler-extra.git
$ cd firejail-handler-extra
$ sudo install -Dm755 ./firejail-handler-bittorrent /usr/bin/firejail-handler-bittorrent
$ sudo install -Dm755 ./firejail-handler-bittorrent-ctl /usr/bin/firejail-handler-bittorrent-ctl
$ sudo install -Dm644 ./firejail-handler-bittorrent.desktop /usr/share/applications/firejail-handler-bittorrent.desktop
$ sudo install -Dm644 ./firejail-handler-bittorrent-ctl.desktop /etc/xdg/autostart/firejail-handler-bittorrent-ctl.desktop
$ sudo install -Dm644 ./firejail-handler-settings-extra.inc /usr/bin/firejail-handler-settings-extra.inc
$ sudo install -Dm755 ./firejail-handler-youtube /usr/bin/firejail-handler-youtube
$ sudo install -Dm755 ./firejail-handler-youtube-ctl /usr/bin/firejail-handler-youtube-ctl
$ sudo install -Dm644 ./firejail-handler-youtube.desktop /usr/share/applications/firejail-handler-youtube.desktop
$ sudo install -Dm644 ./firejail-handler-youtube-ctl.desktop /etc/xdg/autostart/firejail-handler-youtube-ctl.desktop
`````

## Usage

Enable the custom MimeType handlers and configure your web browser(s) accordingly.
Re-login to autostart the inotifywait script(s) via the relevant XDG desktop file(s) or start things manually by other means.
