{
	"info": {
		"_postman_id": "90ca0052-47ab-4cdf-ba63-73e0a69a206a",
		"name": "WorkspaceManagement",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "10786526",
		"_collection_link": "https://universal-robot-38141.postman.co/workspace/Parcel-Safe~4595c8e9-e530-4d91-89a2-f49cec577583/collection/10786526-90ca0052-47ab-4cdf-ba63-73e0a69a206a?action=share&source=collection_link&creator=10786526"
	},
	"item": [
		{
			"name": "Auth",
			"item": [
				{
					"name": "Login",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "username",
									"value": "adminfe",
									"type": "default"
								},
								{
									"key": "password",
									"value": "password",
									"type": "text"
								}
							]
						},
						"url": {
							"raw": "{{apiUrl}}/api/auth/login",
							"host": [
								"{{apiUrl}}"
							],
							"path": [
								"api",
								"auth",
								"login"
							]
						}
					},
					"response": []
				},
				{
					"name": "Register",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Accept",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "username",
									"value": "er",
									"type": "text"
								},
								{
									"key": "email",
									"value": "nancy@marcell.com",
									"type": "text"
								},
								{
									"key": "password",
									"value": "password",
									"type": "text"
								},
								{
									"key": "password_confirmation",
									"value": "password",
									"type": "text"
								},
								{
									"key": "role",
									"value": "member",
									"type": "text"
								}
							]
						},
						"url": {
							"raw": "{{apiUrl}}/api/auth/register",
							"host": [
								"{{apiUrl}}"
							],
							"path": [
								"api",
								"auth",
								"register"
							]
						}
					},
					"response": []
				},
				{
					"name": "Registermember",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Accept",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "username",
									"value": "sarahh",
									"type": "text"
								},
								{
									"key": "email",
									"value": "sarahh@marcell.com",
									"type": "text"
								},
								{
									"key": "password",
									"value": "password",
									"type": "text"
								},
								{
									"key": "password_confirmation",
									"value": "password",
									"type": "text"
								},
								{
									"key": "role",
									"value": "member",
									"type": "text",
									"disabled": true
								}
							]
						},
						"url": {
							"raw": "{{apiUrl}}/api/auth/register-member",
							"host": [
								"{{apiUrl}}"
							],
							"path": [
								"api",
								"auth",
								"register-member"
							]
						}
					},
					"response": []
				},
				{
					"name": "Users",
					"event": [
						{
							"listen": "test",
							"script": {
								"exec": [
									"pm.environment.get(\"authToken\");"
								],
								"type": "text/javascript",
								"packages": {}
							}
						}
					],
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"method": "GET",
						"header": [
							{
								"key": "Accept",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "formdata",
							"formdata": []
						},
						"url": {
							"raw": "{{apiUrl}}/api/users",
							"host": [
								"{{apiUrl}}"
							],
							"path": [
								"api",
								"users"
							]
						}
					},
					"response": []
				},
				{
					"name": "Logout",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Accept",
								"value": "application/json"
							}
						],
						"url": {
							"raw": "{{apiUrl}}/api/auth/logout",
							"host": [
								"{{apiUrl}}"
							],
							"path": [
								"api",
								"auth",
								"logout"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Workspaces",
			"item": [
				{
					"name": "get workspaces",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "https://custom3.mystagingserver.site/trello-api/public/api/workspaces",
							"protocol": "https",
							"host": [
								"custom3",
								"mystagingserver",
								"site"
							],
							"path": [
								"trello-api",
								"public",
								"api",
								"workspaces"
							]
						}
					},
					"response": []
				},
				{
					"name": "Add/edit workspaces",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "title",
									"value": "Custom dev",
									"type": "text"
								},
								{
									"key": "id",
									"value": "1",
									"type": "text",
									"disabled": true
								}
							]
						},
						"url": {
							"raw": "{{apiUrl}}/api/addworkspace",
							"host": [
								"{{apiUrl}}"
							],
							"path": [
								"api",
								"addworkspace"
							]
						}
					},
					"response": []
				},
				{
					"name": "del workspace",
					"request": {
						"method": "DELETE",
						"header": [
							{
								"key": "id",
								"value": "2"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "https://custom3.mystagingserver.site/trello-api/public/api/del-workspace/2",
							"protocol": "https",
							"host": [
								"custom3",
								"mystagingserver",
								"site"
							],
							"path": [
								"trello-api",
								"public",
								"api",
								"del-workspace",
								"2"
							]
						}
					},
					"response": []
				},
				{
					"name": "getWorkspacebyID",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "https://custom3.mystagingserver.site/trello-api/public/api/view-workspace/2",
							"protocol": "https",
							"host": [
								"custom3",
								"mystagingserver",
								"site"
							],
							"path": [
								"trello-api",
								"public",
								"api",
								"view-workspace",
								"2"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Boards",
			"item": [
				{
					"name": "get boards",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "https://custom3.mystagingserver.site/trello-api/public/api/boards",
							"protocol": "https",
							"host": [
								"custom3",
								"mystagingserver",
								"site"
							],
							"path": [
								"trello-api",
								"public",
								"api",
								"boards"
							]
						}
					},
					"response": []
				},
				{
					"name": "get boards by Workspace",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "https://custom3.mystagingserver.site/trello-api/public/api/view-board/1",
							"protocol": "https",
							"host": [
								"custom3",
								"mystagingserver",
								"site"
							],
							"path": [
								"trello-api",
								"public",
								"api",
								"view-board",
								"1"
							]
						}
					},
					"response": []
				},
				{
					"name": "Add/edit boards",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "title",
									"value": "Remote Development Board",
									"type": "text"
								},
								{
									"key": "workspace_id",
									"value": "1",
									"type": "text"
								},
								{
									"key": "id",
									"value": "1",
									"type": "text"
								}
							]
						},
						"url": {
							"raw": "https://custom3.mystagingserver.site/trello-api/public/api/storeboard",
							"protocol": "https",
							"host": [
								"custom3",
								"mystagingserver",
								"site"
							],
							"path": [
								"trello-api",
								"public",
								"api",
								"storeboard"
							]
						}
					},
					"response": []
				},
				{
					"name": "del board",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "https://custom3.mystagingserver.site/trello-api/public/api/del-board/",
							"protocol": "https",
							"host": [
								"custom3",
								"mystagingserver",
								"site"
							],
							"path": [
								"trello-api",
								"public",
								"api",
								"del-board",
								""
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Lists",
			"item": [
				{
					"name": "get lists",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "https://custom3.mystagingserver.site/trello-api/public/api/lists",
							"protocol": "https",
							"host": [
								"custom3",
								"mystagingserver",
								"site"
							],
							"path": [
								"trello-api",
								"public",
								"api",
								"lists"
							]
						}
					},
					"response": []
				},
				{
					"name": "Add/edit lists",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "title",
									"value": "In discussion",
									"type": "text"
								},
								{
									"key": "board_id",
									"value": "1",
									"type": "text"
								},
								{
									"key": "id",
									"value": "1",
									"type": "text",
									"disabled": true
								}
							]
						},
						"url": {
							"raw": "https://custom3.mystagingserver.site/trello-api/public/api/storelist",
							"protocol": "https",
							"host": [
								"custom3",
								"mystagingserver",
								"site"
							],
							"path": [
								"trello-api",
								"public",
								"api",
								"storelist"
							]
						}
					},
					"response": []
				},
				{
					"name": "del list",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "https://custom3.mystagingserver.site/trello-api/public/api/del-list/2",
							"protocol": "https",
							"host": [
								"custom3",
								"mystagingserver",
								"site"
							],
							"path": [
								"trello-api",
								"public",
								"api",
								"del-list",
								"2"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Tasks",
			"item": [
				{
					"name": "get tasks",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"method": "GET",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": []
						},
						"url": {
							"raw": "{{apiUrl}}/api/tasks",
							"host": [
								"{{apiUrl}}"
							],
							"path": [
								"api",
								"tasks"
							]
						}
					},
					"response": []
				},
				{
					"name": "get tasks by List",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"method": "GET",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": []
						},
						"url": {
							"raw": "{{apiUrl}}/api/view-tasks/1",
							"host": [
								"{{apiUrl}}"
							],
							"path": [
								"api",
								"view-tasks",
								"1"
							]
						}
					},
					"response": []
				},
				{
					"name": "delete tasks",
					"request": {
						"method": "DELETE",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": []
						},
						"url": {
							"raw": "{{apiUrl}}/api/remove-task/5",
							"host": [
								"{{apiUrl}}"
							],
							"path": [
								"api",
								"remove-task",
								"5"
							]
						}
					},
					"response": []
				},
				{
					"name": "add/edit task",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Accept",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "title",
									"value": "create Task list for trello",
									"type": "text"
								},
								{
									"key": "description",
									"value": "List down required params and track.",
									"type": "text"
								},
								{
									"key": "board_list_id",
									"value": "1",
									"type": "text"
								},
								{
									"key": "board_id",
									"value": "2",
									"type": "text"
								},
								{
									"key": "position",
									"value": "1",
									"type": "text"
								},
								{
									"key": "id",
									"value": "1",
									"type": "text",
									"disabled": true
								}
							]
						},
						"url": {
							"raw": "{{apiUrl}}/api/add-task",
							"host": [
								"{{apiUrl}}"
							],
							"path": [
								"api",
								"add-task"
							]
						}
					},
					"response": []
				},
				{
					"name": "Search",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "search",
									"value": "tre",
									"type": "text"
								}
							]
						},
						"url": {
							"raw": "{{apiUrl}}/api/search",
							"host": [
								"{{apiUrl}}"
							],
							"path": [
								"api",
								"search"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Board Members",
			"item": [
				{
					"name": "get boardmembers",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "https://custom3.mystagingserver.site/trello-api/public/api/boardmembers",
							"protocol": "https",
							"host": [
								"custom3",
								"mystagingserver",
								"site"
							],
							"path": [
								"trello-api",
								"public",
								"api",
								"boardmembers"
							]
						}
					},
					"response": []
				},
				{
					"name": "Add boardmembers",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "user_id",
									"value": "2",
									"type": "text"
								},
								{
									"key": "board_id",
									"value": "2",
									"type": "text"
								}
							]
						},
						"url": {
							"raw": "https://custom3.mystagingserver.site/trello-api/public/api/mapboardmember",
							"protocol": "https",
							"host": [
								"custom3",
								"mystagingserver",
								"site"
							],
							"path": [
								"trello-api",
								"public",
								"api",
								"mapboardmember"
							]
						}
					},
					"response": []
				},
				{
					"name": "del boardmember",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "https://custom3.mystagingserver.site/trello-api/public/api/remove-member/",
							"protocol": "https",
							"host": [
								"custom3",
								"mystagingserver",
								"site"
							],
							"path": [
								"trello-api",
								"public",
								"api",
								"remove-member",
								""
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Task Members",
			"item": [
				{
					"name": "get taskmembers",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"method": "GET",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": []
						},
						"url": {
							"raw": "{{apiUrl}}/api/taskmembers",
							"host": [
								"{{apiUrl}}"
							],
							"path": [
								"api",
								"taskmembers"
							]
						}
					},
					"response": []
				},
				{
					"name": "Add taskmembers",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Accept",
								"value": "application/json"
							},
							{
								"key": "role",
								"value": "admin",
								"disabled": true
							}
						],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "user_id",
									"value": "2",
									"type": "text"
								},
								{
									"key": "task_id",
									"value": "1",
									"type": "text"
								}
							]
						},
						"url": {
							"raw": "{{apiUrl}}/api/maptaskmember",
							"host": [
								"{{apiUrl}}"
							],
							"path": [
								"api",
								"maptaskmember"
							]
						}
					},
					"response": []
				},
				{
					"name": "del taskmember",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "{{apiUrl}}/api/remove-taskmember/8",
							"host": [
								"{{apiUrl}}"
							],
							"path": [
								"api",
								"remove-taskmember",
								"8"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Comments",
			"item": [
				{
					"name": "get comments",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{apiUrl}}/api/comments",
							"host": [
								"{{apiUrl}}"
							],
							"path": [
								"api",
								"comments"
							]
						}
					},
					"response": []
				},
				{
					"name": "get comments by task",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{apiUrl}}/api/get-comments/2",
							"host": [
								"{{apiUrl}}"
							],
							"path": [
								"api",
								"get-comments",
								"2"
							]
						}
					},
					"response": []
				},
				{
					"name": "del comment",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "{{apiUrl}}/api/remove-comment/1",
							"host": [
								"{{apiUrl}}"
							],
							"path": [
								"api",
								"remove-comment",
								"1"
							]
						}
					},
					"response": []
				},
				{
					"name": "add/edit comment",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Accept",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "comment",
									"value": "1sr comment for trello",
									"type": "text"
								},
								{
									"key": "user_id",
									"value": "1",
									"type": "text"
								},
								{
									"key": "task_id",
									"value": "2",
									"type": "text"
								}
							]
						},
						"url": {
							"raw": "{{apiUrl}}/api/add-comment",
							"host": [
								"{{apiUrl}}"
							],
							"path": [
								"api",
								"add-comment"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Attachments",
			"item": [
				{
					"name": "get attachments",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{apiUrl}}/api/attachments",
							"host": [
								"{{apiUrl}}"
							],
							"path": [
								"api",
								"attachments"
							]
						}
					},
					"response": []
				},
				{
					"name": "get attachment by task",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{apiUrl}}/api/task-attachments/1",
							"host": [
								"{{apiUrl}}"
							],
							"path": [
								"api",
								"task-attachments",
								"1"
							]
						}
					},
					"response": []
				},
				{
					"name": "get attachment by id",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{apiUrl}}/api/get-attachment/2",
							"host": [
								"{{apiUrl}}"
							],
							"path": [
								"api",
								"get-attachment",
								"2"
							]
						}
					},
					"response": []
				},
				{
					"name": "del attachment",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "localhost:8000/api/remove-attachment/",
							"host": [
								"localhost"
							],
							"port": "8000",
							"path": [
								"api",
								"remove-attachment",
								""
							]
						}
					},
					"response": []
				},
				{
					"name": "add/edit attachment",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Accept",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "attachment_name",
									"value": "new att",
									"type": "text"
								},
								{
									"key": "attachment_url",
									"type": "file",
									"src": "/C:/Users/hafsa khan/Downloads/jira-timeline.jpg"
								},
								{
									"key": "user_id",
									"value": "1",
									"type": "text"
								},
								{
									"key": "task_id",
									"value": "1",
									"type": "text"
								},
								{
									"key": "id",
									"value": "7",
									"type": "text"
								}
							]
						},
						"url": {
							"raw": "{{apiUrl}}/api/add-attachment",
							"host": [
								"{{apiUrl}}"
							],
							"path": [
								"api",
								"add-attachment"
							]
						}
					},
					"response": []
				}
			]
		}
	],
	"auth": {
		"type": "bearer",
		"bearer": [
			{
				"key": "token",
				"value": "1|Wf4ZnzkhrIEPcjOG8a4UkKDTwhy0EFG9NP93WEqvd3ef5ad0",
				"type": "string"
			}
		]
	},
	"event": [
		{
			"listen": "prerequest",
			"script": {
				"type": "text/javascript",
				"packages": {},
				"exec": [
					""
				]
			}
		},
		{
			"listen": "test",
			"script": {
				"type": "text/javascript",
				"packages": {},
				"exec": [
					""
				]
			}
		}
	],
	"variable": [
		{
			"key": "apiUrl",
			"value": "https://custom3.mystagingserver.site/trello-api/public"
		}
	]
}