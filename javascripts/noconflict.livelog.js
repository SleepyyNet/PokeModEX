/* ====================================================================
 * Copyright (c) 2012-2016 LoungeKatt Entertainment.  All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in
 *    the documentation and/or other materials provided with the
 *    distribution.
 *
 * 3. All advertising materials mentioning features or use of this
 *    software must display the following acknowledgment:
 *    "This product includes software developed by LoungeKatt" unless
 *    otherwise displayed by public repository entries.
 *
 * 4. The names "LoungeKatt", "TwistedUmbrella", and "LiveLog"
 *    must not be used to endorse or promote products derived from this
 *    software without prior written permission. For written permission,
 *    please contact admin@loungekatt.com.
 *
 * 5. Products derived from this software may not be called "LiveLog"
 *    nor may "LiveLog" appear in their names without prior written
 *    permission of LoungeKatt Entertainment.
 *
 * 6. Redistributions of any form whatsoever must retain the following
 *    acknowledgment:
 *    "This product includes software developed by LoungeKatt" unless
 *    otherwise displayed by tagged repository entries.
 *
 * THIS SOFTWARE IS PROVIDED BY LoungeKatt ``AS IS'' AND ANY
 * EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE OpenSSL PROJECT OR
 * ITS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 * ====================================================================
 *
 * The license and distribution terms for any publicly available version or
 * derivative of this code cannot be changed.  i.e. this code cannot simply be
 * copied and put under another distribution license
 * [including the GNU Public License.] Content not subject to these terms is
 * subject to to the terms and conditions of the Apache License, Version 2.0.
 */

var githubLive = function githubLive(account, developer, anchor, project) {

if (project != null && project != "") {
jQuery.ajax({
url: 'https://api.github.com/repos/' + account + '/' + project + '/commits?callback=jsonp',
type: "GET",
            dataType: "jsonp",
            success: function (dbInfo) {
            jQuery.each(dbInfo.data, function (index, data) {
                        var author = this.commit.committer.name;
                        var stamp = this.commit.committer.date.split('T');
                        var date = stamp[0].replace('T', '');;
                        var time = stamp[1].replace('Z', '');
                        var avatar = this.committer.avatar_url;
                        
                            var sha = this.sha;
                            var origin = this.author.login;
                            var apiUrl = this.url;
                            var gitUrl = apiUrl.replace('https://api.github.com/repos', 'https://github.com');
                            var url = gitUrl.replace('commits', 'commit');
                            var title = this.commit.message.split('\n\n', 1);
                            var message = this.commit.message.substring(this.commit.message.indexOf('\n\n') + 1).replace(/\n/g, '<br />');
                            var action = 'Pushed to';
                            if (author != origin) {
                                origin = author + ' <- [ ' + origin + ' ]<br />';
                                action = 'Picked for';
                            } else {
                                origin = '';
                            }
                            if (title == message) {
                                message = '';
                            }
                            var makeli = jQuery("<div></div>");
                            var innerItem = jQuery("<h4></h4>");
                            innerItem.html(date + ' ' + time);
                            makeli.append(innerItem);
                            var linksli = jQuery("<p></p>");
                            var output = '<h6><img src="' + avatar + '" width="40px" style="vertical-align:middle">&nbsp;&nbsp;' + author + '</h6>'
                            + action + ' ' + project + '<br />'
                            + origin
                            + '<a href="' + url + '" target="_blank">' + sha + '</a><br /><br />'
                            + '<b>' + title + '</b><br />'
                            + message + '<br />';
                            linksli.html(output);
                            makeli.append(linksli);
                            jQuery(anchor).append(makeli);
                });
            },
            error: function (status) {
                console.log(status);
            }
        });
} else {
        jQuery.ajax({
            url: 'https://api.github.com/users/' + account + '/events?callback=jsonp',
            type: "GET",
            dataType: "jsonp",
            success: function (dbInfo) {
                // console.log(dbInfo);
                jQuery.each(dbInfo.data, function (index, data) {
                    var type = data.type;
                    var repo = data.repo.name.replace(account + "/", '');
                    if (type == "PushEvent") {
                        var author = data.actor.login;
                        var stamp = data.created_at.split('T');
                        var date = stamp[0].replace('T', '');;
                        var time = stamp[1].replace('Z', '');
                        var avatar = data.actor.avatar_url;
                        var commits = data.payload.commits;
                        var branch = data.payload.ref.replace('refs/heads/', '');
                        var submission = new Array();
                        jQuery.each(commits, function (index, single) {
                            var sha = single.sha;
                            var origin = single.author.name;
                            var apiUrl = single.url;
                            var gitUrl = apiUrl.replace('https://api.github.com/repos', 'https://github.com');
                            var url = gitUrl.replace('commits', 'commit');
                            var title = single.message.split('\n\n', 1);
                            var message = single.message.substring(single.message.indexOf('\n\n') + 1).replace(/\n/g, '<br />');
                            var action = 'Pushed to';
                            if (author != origin) {
                                origin = author + ' <- [ ' + origin + ' ]<br />';
                                action = 'Picked for';
                            } else {
                                origin = '';
                            }
                            if (title == message) {
                                message = '';
                            }
                            var makeli = jQuery("<div></div>");
                            var innerItem = jQuery("<h4></h4>");
                            innerItem.html(date + ' ' + time);
                            makeli.append(innerItem);
                            var linksli = jQuery("<p></p>");
                            var output = '<h6><img src="' + avatar + '" width="40px" style="vertical-align:middle">&nbsp;&nbsp;' + author + '</h6>'
                            + action + ' ' + branch + ' at ' + repo + '<br />'
                            + origin
                            + '<a href="' + url + '" target="_blank">' + sha + '</a><br /><br />'
                            + '<b>' + title + '</b><br />'
                            + message + '<br />';
                            linksli.html(output);
                            makeli.append(linksli);
                            submission.push(makeli);
                        });
                        submission.reverse();
                        for (i=0;i<submission.length;i++) {
                            jQuery(anchor).append(submission[i]);
                        }
                    } else if (type == "PullRequestEvent") {
                       var number = data.payload.number;
                       var sha = data.payload.pull_request.merge_commit_sha;
                       var author = data.payload.pull_request.user.login;
                       var stamp = data.payload.pull_request.created_at.split('T');
                       var date = stamp[0].replace('T', '');;
                       var time = stamp[1].replace('Z', '');
                       var avatar = data.payload.pull_request.user.avatar_url;
                       var title = data.payload.pull_request.title.split('\n\n', 1);
                       var message = data.payload.pull_request.title.substring(data.payload.pull_request.title.indexOf('\n\n') + 1).replace    (/\n/g, '<br />');
                       if (title == message) {
                       message = '';
                       }
                       var url = data.payload.pull_request.html_url;
                       var makeli = jQuery("<div></div>");
                       var innerItem = jQuery("<h4></h4>");
                       innerItem.html(date + ' ' + time);
                       makeli.append(innerItem);
                       var linksli = jQuery("<p></p>");
                       var output = '<h6><img src="' + avatar + '" width="40px" style="vertical-align:middle">&nbsp;&nbsp;' + author + '</h6>'
                       + 'Submitted Pull #' + number + ' for ' + developer + '<br />'
                       + '<a href="' + url + '" target="_blank">' + sha + '</a><br /><br />'
                       + title + '<br />';
                       linksli.html(output);
                       makeli.append(linksli);
                       jQuery(anchor).append(makeli);
                    } else if (type == "CommitCommentEvent") {
                        var author = data.actor.login;
                        var stamp = data.payload.comment.created_at.split('T');
                        var date = stamp[0].replace('T', '');;
                        var time = stamp[1].replace('Z', '');
                        var avatar = data.actor.avatar_url;
                        var message = data.payload.comment.body.replace(/\n/g, '<br />');
                        var url = data.payload.comment.html_url;
                        var makeli = jQuery("<div></div>");
                        var innerItem = jQuery("<h4></h4>");
                        innerItem.html(date + ' ' + time);
                        makeli.append(innerItem);
                        var linksli = jQuery("<p></p>");
                        var output = '<h6><img src="' + avatar + '" width="40px" style="vertical-align:middle">&nbsp;&nbsp;' + author + '</h6>'
                        + 'Left a comment on ' + developer + '<br />'
                        + '<a href="' + url + '" target="_blank">View original GitHub comment</a><br /><br />'
                        + message + '<br />';
                        linksli.html(output);
                        makeli.append(linksli);
                        jQuery(anchor).append(makeli);
                    }  else if (type == "IssueCommentEvent") {
                       var author = data.actor.login;
                       var stamp = data.payload.comment.created_at.split('T');
                       var issue = data.payload.issue.title;
                       var date = stamp[0].replace('T', '');;
                       var time = stamp[1].replace('Z', '');
                       var avatar = data.actor.avatar_url;
                       var message = data.payload.comment.body.replace(/\n/g, '<br />');
                       var url = data.payload.comment.html_url;
                       var makeli = jQuery("<div></div>");
                       var innerItem = jQuery("<h4></h4>");
                       innerItem.html(date + ' ' + time);
                       makeli.append(innerItem);
                       var linksli = jQuery("<p></p>");
                       var output = '<h6><img src="' + avatar + '" width="40px" style="vertical-align:middle">&nbsp;&nbsp;' + author + '</h6>'
                       + 'Left a comment on ' + issue + '<br />'
                       + '<a href="' + url + '" target="_blank">View original GitHub comment</a><br /><br />'
                       + message + '<br />';
                       linksli.html(output);
                       makeli.append(linksli);
                       jQuery(anchor).append(makeli);
                    }
                });
            },
            error: function (status) {
                console.log(status);
            }
        });
    };
    }