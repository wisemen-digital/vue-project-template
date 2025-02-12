import { JSONSchemaFaker } from "json-schema-faker";
import type * as types from "./types.gen";

export function ContactResponseGenerator(): types.ContactResponse {
  return JSONSchemaFaker.generate({
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string",
      "format": "uuid"
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    },
    "updatedAt": {
      "type": "string",
      "format": "date-time"
    },
    "isActive": {
      "type": "boolean"
    },
    "firstName": {
      "type": "string",
      "nullable": true,
      "example": "John"
    },
    "lastName": {
      "type": "string",
      "nullable": true,
      "example": "Doe"
    },
    "email": {
      "type": "string",
      "format": "email",
      "nullable": true
    },
    "phone": {
      "type": "string",
      "pattern": "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
      "nullable": true
    }
  },
  "required": [
    "uuid",
    "createdAt",
    "updatedAt",
    "isActive",
    "firstName",
    "lastName",
    "email",
    "phone"
  ]
}) as types.ContactResponse;
}

export function CreateContactCommandGenerator(): types.CreateContactCommand {
  return JSONSchemaFaker.generate({
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string",
      "nullable": true,
      "example": "John"
    },
    "lastName": {
      "type": "string",
      "nullable": true,
      "example": "Doe"
    },
    "email": {
      "type": "string",
      "format": "email",
      "nullable": true
    },
    "phone": {
      "type": "string",
      "pattern": "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
      "nullable": true,
      "example": "+32473301974"
    }
  },
  "required": [
    "firstName",
    "lastName",
    "email",
    "phone"
  ]
}) as types.CreateContactCommand;
}

export function CreateContactResponseGenerator(): types.CreateContactResponse {
  return JSONSchemaFaker.generate({
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string",
      "format": "uuid"
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    },
    "updatedAt": {
      "type": "string",
      "format": "date-time"
    },
    "isActive": {
      "type": "boolean"
    },
    "firstName": {
      "type": "string",
      "nullable": true,
      "example": "John"
    },
    "lastName": {
      "type": "string",
      "nullable": true,
      "example": "Doe"
    },
    "email": {
      "type": "string",
      "format": "email",
      "nullable": true
    },
    "phone": {
      "type": "string",
      "pattern": "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
      "nullable": true
    }
  },
  "required": [
    "uuid",
    "createdAt",
    "updatedAt",
    "isActive",
    "firstName",
    "lastName",
    "email",
    "phone"
  ]
}) as types.CreateContactResponse;
}

export function CreateFileDtoGenerator(): types.CreateFileDto {
  return JSONSchemaFaker.generate({
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "mimeType": {
      "allOf": [
        {
          "type": "string",
          "enum": [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "text/plain",
            "text/html",
            "image/jpeg",
            "image/png",
            "image/tiff",
            "image/bmp",
            "image/heic",
            "image/webp",
            "image/gif"
          ]
        }
      ]
    }
  },
  "required": [
    "name",
    "mimeType"
  ]
}) as types.CreateFileDto;
}

export function CreateFileResponseGenerator(): types.CreateFileResponse {
  return JSONSchemaFaker.generate({
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string",
      "format": "uuid"
    },
    "name": {
      "type": "string"
    },
    "mimeType": {
      "nullable": true,
      "allOf": [
        {
          "type": "string",
          "enum": [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "text/plain",
            "text/html",
            "image/jpeg",
            "image/png",
            "image/tiff",
            "image/bmp",
            "image/heic",
            "image/webp",
            "image/gif"
          ]
        }
      ]
    },
    "uploadUrl": {
      "type": "string"
    }
  },
  "required": [
    "uuid",
    "name",
    "mimeType",
    "uploadUrl"
  ]
}) as types.CreateFileResponse;
}

export function CreateRoleCommandGenerator(): types.CreateRoleCommand {
  return JSONSchemaFaker.generate({
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    }
  },
  "required": [
    "name"
  ]
}) as types.CreateRoleCommand;
}

export function MimeTypeGenerator(): types.MimeType {
  return JSONSchemaFaker.generate({
  "type": "string",
  "enum": [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "text/plain",
    "text/html",
    "image/jpeg",
    "image/png",
    "image/tiff",
    "image/bmp",
    "image/heic",
    "image/webp",
    "image/gif"
  ]
}) as types.MimeType;
}

export function PaginatedOffsetQueryGenerator(): types.PaginatedOffsetQuery {
  return JSONSchemaFaker.generate({
  "type": "object",
  "properties": {
    "limit": {
      "type": "number",
      "minimum": 1,
      "maximum": 100
    },
    "offset": {
      "type": "number",
      "minimum": 0
    }
  },
  "required": [
    "limit",
    "offset"
  ]
}) as types.PaginatedOffsetQuery;
}

export function PaginatedOffsetResponseMetaGenerator(): types.PaginatedOffsetResponseMeta {
  return JSONSchemaFaker.generate({
  "type": "object",
  "properties": {
    "total": {
      "type": "number"
    },
    "offset": {
      "type": "number"
    },
    "limit": {
      "type": "number"
    }
  },
  "required": [
    "total",
    "offset",
    "limit"
  ]
}) as types.PaginatedOffsetResponseMeta;
}

export function PermissionObjectGenerator(): types.PermissionObject {
  return JSONSchemaFaker.generate({
  "type": "object",
  "properties": {
    "id": {
      "type": "string"
    },
    "actions": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  },
  "required": [
    "id",
    "actions"
  ]
}) as types.PermissionObject;
}

export function PermissionGenerator(): types.Permission {
  return JSONSchemaFaker.generate({
  "type": "string",
  "enum": [
    "admin",
    "read_only",
    "user.read",
    "user.create",
    "user.update",
    "user.delete",
    "role.read",
    "role.create",
    "role.update",
    "role.delete",
    "contact.create",
    "contact.read",
    "contact.update",
    "contact.delete"
  ]
}) as types.Permission;
}

export function RoleResponseGenerator(): types.RoleResponse {
  return JSONSchemaFaker.generate({
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string",
      "format": "uuid"
    },
    "createdAt": {
      "format": "date-time",
      "type": "string"
    },
    "updatedAt": {
      "format": "date-time",
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "permissions": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "admin",
          "read_only",
          "user.read",
          "user.create",
          "user.update",
          "user.delete",
          "role.read",
          "role.create",
          "role.update",
          "role.delete",
          "contact.create",
          "contact.read",
          "contact.update",
          "contact.delete"
        ]
      }
    }
  },
  "required": [
    "uuid",
    "createdAt",
    "updatedAt",
    "name",
    "permissions"
  ]
}) as types.RoleResponse;
}

export function SetUserRolesCommandGenerator(): types.SetUserRolesCommand {
  return JSONSchemaFaker.generate({
  "type": "object",
  "properties": {
    "roleUuids": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "uuid"
      }
    }
  },
  "required": [
    "roleUuids"
  ]
}) as types.SetUserRolesCommand;
}

export function ThemeGenerator(): types.Theme {
  return JSONSchemaFaker.generate({
  "type": "string",
  "enum": [
    "light",
    "dark",
    "system"
  ]
}) as types.Theme;
}

export function TypesenseCollectionNameGenerator(): types.TypesenseCollectionName {
  return JSONSchemaFaker.generate({
  "type": "string",
  "enum": [
    "user"
  ]
}) as types.TypesenseCollectionName;
}

export function UpdateContactCommandGenerator(): types.UpdateContactCommand {
  return JSONSchemaFaker.generate({
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string",
      "nullable": true,
      "example": "John"
    },
    "lastName": {
      "type": "string",
      "nullable": true,
      "example": "Doe"
    },
    "email": {
      "type": "string",
      "format": "email",
      "nullable": true
    },
    "phone": {
      "type": "string",
      "pattern": "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
      "nullable": true,
      "example": "+32473301974"
    },
    "isActive": {
      "type": "boolean"
    }
  },
  "required": [
    "firstName",
    "lastName",
    "email",
    "phone",
    "isActive"
  ]
}) as types.UpdateContactCommand;
}

export function UpdatePreferencesCommandGenerator(): types.UpdatePreferencesCommand {
  return JSONSchemaFaker.generate({
  "type": "object",
  "properties": {
    "theme": {
      "allOf": [
        {
          "type": "string",
          "enum": [
            "light",
            "dark",
            "system"
          ]
        }
      ]
    },
    "language": {
      "type": "string",
      "example": "en"
    },
    "fontSize": {
      "type": "string",
      "example": "default"
    },
    "showShortcuts": {
      "type": "boolean",
      "example": false
    },
    "reduceMotion": {
      "type": "boolean",
      "example": false
    },
    "highContrast": {
      "type": "boolean",
      "example": false
    }
  }
}) as types.UpdatePreferencesCommand;
}

export function UpdateRoleCommandGenerator(): types.UpdateRoleCommand {
  return JSONSchemaFaker.generate({
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    }
  },
  "required": [
    "name"
  ]
}) as types.UpdateRoleCommand;
}

export function UpdateRolesBulkCommandGenerator(): types.UpdateRolesBulkCommand {
  return JSONSchemaFaker.generate({
  "type": "object",
  "properties": {
    "roles": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "permissions": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string"
                },
                "actions": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              },
              "required": [
                "id",
                "actions"
              ]
            }
          }
        },
        "required": [
          "uuid",
          "name",
          "permissions"
        ]
      }
    }
  },
  "required": [
    "roles"
  ]
}) as types.UpdateRolesBulkCommand;
}

export function UpdateRolesBulkRoleCommandGenerator(): types.UpdateRolesBulkRoleCommand {
  return JSONSchemaFaker.generate({
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "permissions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "actions": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "id",
          "actions"
        ]
      }
    }
  },
  "required": [
    "uuid",
    "name",
    "permissions"
  ]
}) as types.UpdateRolesBulkRoleCommand;
}

export function UserIndexViewGenerator(): types.UserIndexView {
  return JSONSchemaFaker.generate({
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string",
      "format": "uuid"
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "firstName": {
      "type": "string",
      "nullable": true,
      "example": "John"
    },
    "lastName": {
      "type": "string",
      "nullable": true,
      "example": "Doe"
    }
  },
  "required": [
    "uuid",
    "email",
    "firstName",
    "lastName"
  ]
}) as types.UserIndexView;
}

export function UsersFilterQueryGenerator(): types.UsersFilterQuery {
  return JSONSchemaFaker.generate({
  "type": "object",
  "properties": {
    "permissions": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "admin",
          "read_only",
          "user.read",
          "user.create",
          "user.update",
          "user.delete",
          "role.read",
          "role.create",
          "role.update",
          "role.delete",
          "contact.create",
          "contact.read",
          "contact.update",
          "contact.delete"
        ]
      }
    }
  }
}) as types.UsersFilterQuery;
}

export function ViewContactDetailResponseGenerator(): types.ViewContactDetailResponse {
  return JSONSchemaFaker.generate({
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string",
      "format": "uuid"
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    },
    "updatedAt": {
      "type": "string",
      "format": "date-time"
    },
    "isActive": {
      "type": "boolean"
    },
    "firstName": {
      "type": "string",
      "nullable": true,
      "example": "John"
    },
    "lastName": {
      "type": "string",
      "nullable": true,
      "example": "Doe"
    },
    "email": {
      "type": "string",
      "format": "email",
      "nullable": true
    },
    "phone": {
      "type": "string",
      "pattern": "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
      "nullable": true
    }
  },
  "required": [
    "uuid",
    "createdAt",
    "updatedAt",
    "isActive",
    "firstName",
    "lastName",
    "email",
    "phone"
  ]
}) as types.ViewContactDetailResponse;
}

export function ViewContactIndexFilterQueryGenerator(): types.ViewContactIndexFilterQuery {
  return JSONSchemaFaker.generate({
  "type": "object",
  "properties": {
    "isActive": {
      "type": "string"
    }
  }
}) as types.ViewContactIndexFilterQuery;
}

export function ViewContactIndexResponseGenerator(): types.ViewContactIndexResponse {
  return JSONSchemaFaker.generate({
  "type": "object",
  "properties": {
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string",
            "format": "uuid"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time"
          },
          "isActive": {
            "type": "boolean"
          },
          "firstName": {
            "type": "string",
            "nullable": true,
            "example": "John"
          },
          "lastName": {
            "type": "string",
            "nullable": true,
            "example": "Doe"
          },
          "email": {
            "type": "string",
            "format": "email",
            "nullable": true
          },
          "phone": {
            "type": "string",
            "pattern": "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
            "nullable": true
          }
        },
        "required": [
          "uuid",
          "createdAt",
          "updatedAt",
          "isActive",
          "firstName",
          "lastName",
          "email",
          "phone"
        ]
      }
    },
    "meta": {
      "type": "object",
      "properties": {
        "total": {
          "type": "number"
        },
        "offset": {
          "type": "number"
        },
        "limit": {
          "type": "number"
        }
      },
      "required": [
        "total",
        "offset",
        "limit"
      ]
    }
  },
  "required": [
    "items",
    "meta"
  ]
}) as types.ViewContactIndexResponse;
}

export function ViewMeResponseGenerator(): types.ViewMeResponse {
  return JSONSchemaFaker.generate({
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string",
      "format": "uuid"
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "firstName": {
      "type": "string",
      "nullable": true,
      "example": "John"
    },
    "lastName": {
      "type": "string",
      "nullable": true,
      "example": "Doe"
    },
    "roles": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string",
            "format": "uuid"
          },
          "createdAt": {
            "format": "date-time",
            "type": "string"
          },
          "updatedAt": {
            "format": "date-time",
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "permissions": {
            "type": "array",
            "items": {
              "type": "string",
              "enum": [
                "admin",
                "read_only",
                "user.read",
                "user.create",
                "user.update",
                "user.delete",
                "role.read",
                "role.create",
                "role.update",
                "role.delete",
                "contact.create",
                "contact.read",
                "contact.update",
                "contact.delete"
              ]
            }
          }
        },
        "required": [
          "uuid",
          "createdAt",
          "updatedAt",
          "name",
          "permissions"
        ]
      }
    }
  },
  "required": [
    "uuid",
    "email",
    "firstName",
    "lastName",
    "roles"
  ]
}) as types.ViewMeResponse;
}

export function ViewPreferencesResponseGenerator(): types.ViewPreferencesResponse {
  return JSONSchemaFaker.generate({
  "type": "object",
  "properties": {
    "theme": {
      "allOf": [
        {
          "type": "string",
          "enum": [
            "light",
            "dark",
            "system"
          ]
        }
      ]
    },
    "language": {
      "type": "string",
      "nullable": true
    },
    "fontSize": {
      "type": "string",
      "nullable": true
    },
    "showShortcuts": {
      "type": "boolean"
    },
    "reduceMotion": {
      "type": "boolean"
    },
    "highContrast": {
      "type": "boolean"
    }
  },
  "required": [
    "theme",
    "language",
    "fontSize",
    "showShortcuts",
    "reduceMotion",
    "highContrast"
  ]
}) as types.ViewPreferencesResponse;
}

export function ViewRoleIndexResponseGenerator(): types.ViewRoleIndexResponse {
  return JSONSchemaFaker.generate({
  "type": "object",
  "properties": {
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string",
            "format": "uuid"
          },
          "createdAt": {
            "format": "date-time",
            "type": "string"
          },
          "updatedAt": {
            "format": "date-time",
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "permissions": {
            "type": "array",
            "items": {
              "type": "string",
              "enum": [
                "admin",
                "read_only",
                "user.read",
                "user.create",
                "user.update",
                "user.delete",
                "role.read",
                "role.create",
                "role.update",
                "role.delete",
                "contact.create",
                "contact.read",
                "contact.update",
                "contact.delete"
              ]
            }
          }
        },
        "required": [
          "uuid",
          "createdAt",
          "updatedAt",
          "name",
          "permissions"
        ]
      }
    }
  },
  "required": [
    "items"
  ]
}) as types.ViewRoleIndexResponse;
}

export function ViewUserResponseGenerator(): types.ViewUserResponse {
  return JSONSchemaFaker.generate({
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string",
      "format": "uuid"
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "firstName": {
      "type": "string",
      "nullable": true,
      "example": "John"
    },
    "lastName": {
      "type": "string",
      "nullable": true,
      "example": "Doe"
    },
    "roles": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string",
            "format": "uuid"
          },
          "createdAt": {
            "format": "date-time",
            "type": "string"
          },
          "updatedAt": {
            "format": "date-time",
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "permissions": {
            "type": "array",
            "items": {
              "type": "string",
              "enum": [
                "admin",
                "read_only",
                "user.read",
                "user.create",
                "user.update",
                "user.delete",
                "role.read",
                "role.create",
                "role.update",
                "role.delete",
                "contact.create",
                "contact.read",
                "contact.update",
                "contact.delete"
              ]
            }
          }
        },
        "required": [
          "uuid",
          "createdAt",
          "updatedAt",
          "name",
          "permissions"
        ]
      }
    }
  },
  "required": [
    "uuid",
    "email",
    "firstName",
    "lastName",
    "roles"
  ]
}) as types.ViewUserResponse;
}

export function ViewUsersResponseGenerator(): types.ViewUsersResponse {
  return JSONSchemaFaker.generate({
  "type": "object",
  "properties": {
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string",
            "format": "uuid"
          },
          "email": {
            "type": "string",
            "format": "email"
          },
          "firstName": {
            "type": "string",
            "nullable": true,
            "example": "John"
          },
          "lastName": {
            "type": "string",
            "nullable": true,
            "example": "Doe"
          }
        },
        "required": [
          "uuid",
          "email",
          "firstName",
          "lastName"
        ]
      }
    },
    "meta": {
      "type": "object",
      "properties": {
        "total": {
          "type": "number"
        },
        "offset": {
          "type": "number"
        },
        "limit": {
          "type": "number"
        }
      },
      "required": [
        "total",
        "offset",
        "limit"
      ]
    }
  },
  "required": [
    "items",
    "meta"
  ]
}) as types.ViewUsersResponse;
}

